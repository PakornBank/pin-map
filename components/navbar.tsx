"use client";

import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  IconGauge,
  IconFingerprint,
  IconActivity,
  IconChevronRight,
} from "@tabler/icons-react";
import {
  Button,
  Flex,
  NavLink,
  Stack,
  Autocomplete,
  Group,
  Avatar,
} from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useForm } from "@mantine/form";

import { fetchCategories } from "@/lib/data";
import { fetchUsers } from "@/lib/data";
import { fetchPinsList } from "@/lib/data";

export default function Navbar() {
  const { data: session, status } = useSession();
  const userName = session?.user?.name;
  const userIcon = session?.user?.image;
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm({
    initialValues: {
      category: searchParams.get("category") || "",
      user: searchParams.get("user") || "",
      pin_name: searchParams.get("pin_name") || "",
    },
  });

  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [pinsList, setPinsList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await fetchCategories();
        setCategories(categories);
        const users = await fetchUsers();
        setUsers(users);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const category = searchParams.get("category");
        const user = searchParams.get("user");
        const pin_name = searchParams.get("pin_name");
        const pins = await fetchPinsList(category, user, pin_name);
        setPinsList(pins);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [searchParams]);

  const handleSubmit = ({
    category,
    user,
    pin_name,
  }: {
    category: string;
    user: string;
    pin_name: string;
  }) => {
    const params = new URLSearchParams();
    if (category.length > 0) {
      params.set("category", category);
    }
    if (user.length > 0) {
      params.set("user", user);
    }
    if (pin_name.length > 0) {
      params.set("pin_name", pin_name);
    }
    router.push("map?" + params.toString());
  };

  return (
    <>
      <Flex
        direction="column"
        py={10}
        w={220}
        h={"100vh"}
        bg={"white"}
        justify={"space-between"}
        pos={"absolute"}
        style={{ zIndex: 10 }}
        px={10}
      >
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Stack gap={"md"}>
            <Autocomplete
              label="Search"
              placeholder="Search"
              maxDropdownHeight={200}
              data={pinsList}
              {...form.getInputProps("pin_name")}
            />
            <Button type="submit">Search</Button>
            <Autocomplete
              label="Select Category"
              placeholder="Pick or enter category"
              data={categories}
              maxDropdownHeight={200}
              {...form.getInputProps("category")}
            />
            <Autocomplete
              label="Select User"
              placeholder="Pick or enter user"
              data={users}
              maxDropdownHeight={200}
              {...form.getInputProps("user")}
            />
            <Button type="submit">Apply filter</Button>
          </Stack>
        </form>

        <Stack gap={0}>
          {status === "authenticated" && (
            <Group wrap="nowrap">
              <Avatar variant="filled" radius={"xl"} src={userIcon}></Avatar>
              <NavLink
                component={Link}
                href="/login"
                label={userName}
                rightSection={<IconChevronRight size="1rem" stroke={1.5} />}
                color="gray"
              />
            </Group>
          )}
          {status === "authenticated" ? (
            <Button onClick={() => signOut()}>Sign out</Button>
          ) : (
            <NavLink
              component={Link}
              href="/api/auth/signin"
              label="Login"
              rightSection={<IconChevronRight size="1rem" stroke={1.5} />}
              color="gray"
            />
          )}
        </Stack>
      </Flex>
    </>
  );
}

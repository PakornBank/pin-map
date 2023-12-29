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
import { useForm } from "@mantine/form";

export default function NavbarSimple() {
  const { data: session, status } = useSession();
  const userName = session?.user?.name;
  const userIcon = session?.user?.image;
  const form = useForm({
    initialValues: { category: "" },
  });

  const router = useRouter();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/category`);
        let categories = await res.json();
        categories = categories.map((category: { category: string }) => {
          return category.category;
        });
        setCategories(categories);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = (category: string) => {
    router.push(category.length > 0 ? `?category=${category}` : "?");
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
      >
        <form
          onSubmit={form.onSubmit((values) => handleSubmit(values.category))}
        >
          <Stack gap={"md"} px={10}>
            <Autocomplete
              label="Select Category"
              placeholder="Pick or enter category"
              data={categories}
              maxDropdownHeight={200}
              {...form.getInputProps("category")}
            />
            <Button type="submit">Search</Button>
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
              href="/login"
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

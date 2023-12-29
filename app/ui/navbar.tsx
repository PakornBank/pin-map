"use client";

import { useEffect, useState } from "react";
import {
  IconGauge,
  IconFingerprint,
  IconActivity,
  IconChevronRight,
} from "@tabler/icons-react";
import { Button, Flex, NavLink, Stack, Autocomplete } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/navigation";
const data = [
  { icon: IconGauge, label: "Dashboard", description: "Item with description" },
  {
    icon: IconFingerprint,
    label: "Security",
    rightSection: <IconChevronRight size="1rem" stroke={1.5} />,
  },
  { icon: IconActivity, label: "Activity" },
];

export default function NavbarSimple() {
  const router = useRouter();

  const [category, setCategory] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/category`);
        let categories = await res.json();
        // turn array of objects into array of strings
        categories = categories.map((category) => {
          return category.category;
        });
        console.log(categories);
        setCategory(categories);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Flex
        direction="column"
        w={220}
        h={"100vh"}
        bg={"white"}
        justify={"space-between"}
        gap={"xl"}
        pos={"absolute"}
        style={{ zIndex: 10 }}
      >
        <Stack gap={0} px={10}>
          <Autocomplete
            label="Select Category"
            placeholder="Pick or enter category"
            data={category}
            maxDropdownHeight={200}
            onChange={setSelectedCategory}
          />
          <Button
            onClick={() => {
              router.push(`?category=${selectedCategory}`);
            }}
          >
            Search
          </Button>
        </Stack>
        <Stack gap={0}>
          <NavLink
            component={Link}
            href="#required-for-focus"
            label="Logout"
            rightSection={<IconChevronRight size="1rem" stroke={1.5} />}
            color="gray"
          />
        </Stack>
      </Flex>
    </>
  );
}

"use client";

import { useState } from "react";
import {
  IconGauge,
  IconFingerprint,
  IconActivity,
  IconChevronRight,
} from "@tabler/icons-react";
import { Box, Flex, NavLink, Stack } from "@mantine/core";
import Link from "next/link";
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
  const [active, setActive] = useState(0);

  const items = data.map((item, index) => (
    <NavLink
      component={Link}
      href="#required-for-focus"
      key={item.label}
      active={index === active}
      label={item.label}
      description={item.description}
      rightSection={item.rightSection}
      // icon={<item.icon size="1rem" stroke={1.5} />}
      onClick={() => setActive(index)}
      color="gray"
    />
  ));

  return (
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
      <Stack gap={0}>{items}</Stack>
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
  );
}

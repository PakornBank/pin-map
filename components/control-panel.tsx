import * as React from "react";
import { Stack, Button, Text, Box, LoadingOverlay } from "@mantine/core";
import Link from "next/link";
import { useSession } from "next-auth/react";

function round5(value: number) {
  return (Math.round(value * 1e5) / 1e5).toFixed(5);
}

interface ControlPanelProps {
  longitude: number;
  latitude: number;
  handleShowCreateForm: () => void;
}

function ControlPanel(props: ControlPanelProps) {
  const { data: session, status } = useSession();
  const { longitude, latitude, handleShowCreateForm } = props;

  if (status === "authenticated" && session?.user?.id) {
    return (
      <Stack
        className="control-panel"
        style={{ position: "absolute", top: "10px", right: "50px" }}
        bg={"white"}
        p={10}
        gap={5}
      >
        <Text size="lg" fw={700}>
          Pin location
        </Text>
        <Text size="md">Drag the screen around</Text>
        <Text size="sm">Latitude</Text>
        <Text size="md">{round5(latitude)}</Text>
        <Text size="sm">Longitude</Text>
        <Text size="md">{round5(longitude)}</Text>

        <Button onClick={handleShowCreateForm}>Add a pin</Button>
      </Stack>
    );
  }

  if (status === "loading" || status === "unauthenticated") {
    return (
      <Button
        style={{ position: "absolute", top: "10px", right: "50px" }}
        w={180}
        component={Link}
        href="/api/auth/signin"
        color="grey"
      >
        Sign in to pin location
      </Button>
    );
  }

  return (
    <Box
      style={{ position: "absolute", top: "10px", right: "50px" }}
      w={180}
      h={100}
    >
      <LoadingOverlay
        zIndex={1000}
        visible={true}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
    </Box>
  );
}

export default React.memo(ControlPanel);

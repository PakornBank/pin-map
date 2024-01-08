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
  showCreateForm: boolean;
}

function ControlPanel(props: ControlPanelProps) {
  const { data: session, status } = useSession();
  const { longitude, latitude, handleShowCreateForm, showCreateForm } = props;

  if (status === "authenticated" && session?.user?.id) {
    return (
      <Box
        bg={"white"}
        style={{
          position: "absolute",
          top: "10px",
          right: "50px",
          borderRadius: "5px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Stack className="control-panel" p={10} gap={5}>
          <Text size="lg" fw={700}>
            Pin location
          </Text>
          <Text size="md">Drag the screen around</Text>
          <Text size="sm">Latitude</Text>
          <Text size="md">{round5(latitude)}</Text>
          <Text size="sm">Longitude</Text>
          <Text size="md">{round5(longitude)}</Text>
          {showCreateForm ? (
            <Button onClick={handleShowCreateForm} color="red">
              Cancel
            </Button>
          ) : (
            <Button onClick={handleShowCreateForm}>Add a pin</Button>
          )}
        </Stack>
      </Box>
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

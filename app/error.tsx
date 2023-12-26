"use client";

import { useEffect } from "react";
import { Button, Center, Stack, Text } from "@mantine/core";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Center h={"100vh"}>
      <Stack align="center">
        <Text size="lg" fw={700}>
          Something went wrong!
        </Text>
        <Text size="lg">{error.message}</Text>
        <Button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </Button>
      </Stack>
    </Center>
  );
}

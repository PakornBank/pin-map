import MapComponent from "../../components/map-component";
import { Box, Skeleton } from "@mantine/core";
import { Suspense } from "react";

export default function Home() {
  return (
    <Box
      style={{
        width: "100%",
        height: "100vh",
        position: "absolute",
        display: "inline-block",
      }}
    >
      <Suspense fallback={<Skeleton height="100%" width="100%" />}>
        <MapComponent></MapComponent>
      </Suspense>
    </Box>
  );
}

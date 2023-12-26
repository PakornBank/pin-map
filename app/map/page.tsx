import Image from "next/image";
import styles from "./page.module.css";
import MapComponent from "../ui/map-component";
import { Box, Flex } from "@mantine/core";

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
      <MapComponent></MapComponent>
    </Box>
  );
}

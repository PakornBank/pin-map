import { Box } from "@mantine/core";
import Pin from "./pin";

export default function CenterPin() {
  return (
    <Box
      pos={"absolute"}
      style={{
        zIndex: 10,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -18px)",
      }}
    >
      <Pin size={20} />
    </Box>
  );
}

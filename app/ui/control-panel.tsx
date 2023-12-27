import * as React from "react";
import {
  Stack,
  Input,
  InputWrapper,
  Button,
  NumberInput,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";

function round5(value: number) {
  return (Math.round(value * 1e5) / 1e5).toFixed(5);
}

function isValidLat(value: number) {
  if (value < -90 || value > 90) {
    // return "Latitude must be between -90 and 90";
    return false;
  }
  if (isNaN(value)) {
    //   return "Latitude must be a number";
    return false;
  }
  return true;
}

function isValidLong(value: number) {
  if (value < -180 || value > 180) {
    // return "Longitude must be between -180 and 180";
    return false;
  }
  if (isNaN(value)) {
    //
    return false;
  }
  return true;
}

interface ControlPanelProps {
  longitude: number;
  latitude: number;
  handleShowMarker: () => void;
  handleChangeLat: (lat: number) => void;
  handleChangeLong: (long: number) => void;
}

function ControlPanel(props: ControlPanelProps) {
  const {
    longitude,
    latitude,
    handleShowMarker,
    handleChangeLat,
    handleChangeLong,
  } = props;

  // const form = useForm({
  //   validateInputOnChange: true,
  //   initialValues: { latitude: latitude, longitude: longitude },
  //   // functions will be used to validate values at corresponding key
  //   validate: {
  //     latitude: validateLatitude,
  //     longitude: validateLongitude,
  //   },
  // });

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
      <NumberInput
        value={round5(latitude)}
        onChange={(newValue) => {
          if (isValidLat(+newValue)) {
            handleChangeLat(+newValue);
          }
        }}
        label="Latitude"
        hideControls
        // {...form.getInputProps("latitude")}
      />
      <NumberInput
        mb={10}
        value={round5(longitude)}
        onChange={(newValue) => {
          if (isValidLong(+newValue)) {
            handleChangeLong(+newValue);
          }
        }}
        label="Longitude"
        hideControls
        // {...form.getInputProps("longitude")}
      />

      <Button onClick={handleShowMarker}>toggle marker</Button>
    </Stack>
  );
}

export default React.memo(ControlPanel);

import { useForm } from "@mantine/form";
import { useSession } from "next-auth/react";
import {
  Card,
  Image,
  TextInput,
  Stack,
  Flex,
  Checkbox,
  Button,
} from "@mantine/core";
import { createPin } from "../lib/actions";

export default function PopupForm({
  latitude,
  longitude,
  fetchPins,
}: {
  latitude: number;
  longitude: number;
  fetchPins: () => void;
}) {
  const { data: session, status } = useSession();
  const form = useForm({
    initialValues: {
      image_url: "",
      pin_name: "",
      category: "",
      description: "",
      is_active: true,
      user_id: session?.user?.id,
    },
  });

  const handleSubmit = async (formValues: any) => {
    formValues.latitude = latitude;
    formValues.longitude = longitude;
    console.log(formValues);
    // try {
    //   const res = await createPin(formValues);
    //   console.log(res);
    //   form.reset();
    //   fetchPins();
    // } catch (error) {
    //   console.log(error);
    // }
  };

  if (status !== "authenticated") {
    return <></>;
  }

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Card>
        <Stack gap={10}>
          <TextInput
            label="Image URL"
            placeholder="https://example.com/image.jpg"
            required
            {...form.getInputProps("image_url")}
          />
          <TextInput
            label="Pin Name"
            placeholder="Pin Name"
            required
            {...form.getInputProps("pin_name")}
          />
          <TextInput
            label="Description"
            placeholder="Description"
            required
            {...form.getInputProps("description")}
          />
          <TextInput
            label="Category"
            placeholder="Category"
            required
            {...form.getInputProps("category")}
          />
          <Flex direction="row" gap={10}>
            <Checkbox
              label="Active"
              checked={form.values.is_active}
              // onChange={(event) => {
              //   form.setFieldValue("is_active", event.currentTarget.checked);
              // }}
              {...form.getInputProps("is_active")}
            ></Checkbox>
          </Flex>
          <Flex direction="row" gap={10}>
            <Button type="submit">Submit</Button>
            <Button type="reset">Reset</Button>
          </Flex>
        </Stack>
      </Card>
    </form>
  );
}

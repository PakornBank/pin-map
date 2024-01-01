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
  Autocomplete,
} from "@mantine/core";
import { createPin } from "../lib/actions";
import { useState, useEffect, use } from "react";

export default function PopupForm({
  latitude,
  longitude,
  fetchPins,
  setShowMarker,
}: {
  latitude: number;
  longitude: number;
  fetchPins: () => void;
  setShowMarker: (show: boolean) => void;
}) {
  const { data: session, status } = useSession();

  const [categories, setCategories] = useState([]);

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
    try {
      const res = await createPin(formValues);
      console.log("done!", res);
      form.reset();
      setShowMarker(false);
      fetchPins();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    const res = await fetch(`/api/category`, {
      cache: "no-store",
    });
    const data = await res.json();
    const categories = data.map((category: { category: string }) => {
      return category.category;
    });
    setCategories(categories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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
          <Autocomplete
            label="Select Category"
            placeholder="Pick or enter category"
            required
            data={categories}
            maxDropdownHeight={200}
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

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
  LoadingOverlay,
  HoverCard,
  Box,
} from "@mantine/core";
import { createPin } from "../lib/actions";
import { useState, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";

import CenterPin from "./centerPin";

export default function PopupForm({
  latitude,
  longitude,
  fetchPins,
  setShowCreateForm,
  setPopupInfo,
  showCreateForm,
}: {
  latitude: number;
  longitude: number;
  fetchPins: () => void;
  setShowCreateForm: (show: boolean) => void;
  setPopupInfo: (info: any) => void;
  showCreateForm: boolean;
}) {
  const { data: session, status } = useSession();

  const [categories, setCategories] = useState([]);

  const [visible, { toggle }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      image_url: "",
      pin_name: "",
      category: "",
      description: "",
      is_active: true,
    },
  });

  const handleSubmit = async (formValues: any) => {
    toggle();
    formValues.latitude = latitude;
    formValues.longitude = longitude;
    formValues.user_id = session?.user?.id;
    try {
      const res = await createPin(formValues);
      form.reset();
      setShowCreateForm(false);
      setPopupInfo(res);
      fetchPins();
      toggle();
    } catch (error) {
      console.error(error);
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

  if (status !== "authenticated" || !session?.user?.id || !showCreateForm) {
    return <></>;
  }

  return (
    <>
      <CenterPin />
      <Box
        pos={"absolute"}
        style={{
          zIndex: 10,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, 15px)",
        }}
      >
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <LoadingOverlay
            visible={visible}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
          <Card>
            <Stack gap={10}>
              <HoverCard width={300} shadow="md">
                <HoverCard.Target>
                  <TextInput
                    label="Image URL"
                    placeholder="https://example.com/image.jpg"
                    required
                    {...form.getInputProps("image_url")}
                  />
                </HoverCard.Target>

                {form.values.image_url && (
                  <HoverCard.Dropdown>
                    <Image
                      src={form.values.image_url}
                      alt={form.values.pin_name}
                      height={100}
                      width={100}
                      fit="cover"
                    />
                  </HoverCard.Dropdown>
                )}
              </HoverCard>

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
                  color="green"
                  checked={form.values.is_active}
                  {...form.getInputProps("is_active")}
                ></Checkbox>
              </Flex>
              <Flex direction="row" gap={10}>
                <Button type="submit">Submit</Button>
                <Button color="red" type="reset">
                  Reset
                </Button>
              </Flex>
            </Stack>
          </Card>
        </form>
      </Box>
    </>
  );
}

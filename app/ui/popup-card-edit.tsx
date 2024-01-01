import { IconEdit } from "@tabler/icons-react";
import { Button, Card, TextInput, Stack, Flex, Checkbox } from "@mantine/core";
import { useState } from "react";
import { editPin } from "../lib/actions";
import { useForm } from "@mantine/form";
import PopupCardDisplay from "./popup-card-display";

export default function PopupCardEdit({
  pinData,
  fetchPins,
  setIsEditing,
  setPopupInfo,
}: {
  pinData: any;
  fetchPins: () => void;
  setIsEditing: (isEditing: boolean) => void;
  setPopupInfo: (info: any) => void;
}) {
  const form = useForm({
    initialValues: {
      pin_id: pinData.id,
      image_url: pinData.image_url,
      pin_name: pinData.pin_name,
      category: pinData.category,
      description: pinData.description,
      is_active: pinData.is_active,
    },
  });

  const handleSubmit = async (formValues: any) => {
    try {
      console.log("formValues", formValues);
      const res = await editPin(formValues);
      console.log("done!", res);
      setIsEditing(false);
      await fetchPins();
      setPopupInfo(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
              <Button
                type="reset"
                onClick={() => {
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>
            </Flex>
          </Stack>
        </Card>
      </form>
    </>
  );
}

// Compare this snippet from app/ui/popup-from.tsx:
// import { useForm } from "@mantine/form";
// import { useSession } from "next-auth/react";
// import {
//   Card,
//   Image,
//   TextInput,
//   Stack,
//   Flex,
//   Checkbox,
//   Button,
// } from "@mantine/core";
// import { createPin } from "../lib/actions";

// export default function PopupForm({
//   latitude,
//   longitude,
//   fetchPins,
// }: {
//   latitude: number;
//   longitude: number;
//   fetchPins: () => void;
// }) {
//   const { data: session, status } = useSession();
//   const form = useForm({
//     initialValues: {
//       image_url: "",
//       pin_name: "",
//       category: "",
//       description: "",
//       is_active: true,
//       user_id: session?.user?.id,
//     },
//   });

//   const handleSubmit = async (formValues: any) => {
//     formValues.latitude = latitude;
//     formValues.longitude = longitude;
//     try {
//       const res = await createPin(formValues);
//       console.log("done!", res);
//       form.reset();
//       fetchPins();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   if (status !== "authenticated") {
//     return <></>;
//   }

//   return (
//     <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
//       <Card>
//         <Stack gap={10}>
//           <TextInput
//             label="Image URL"
//             placeholder="https://example.com/image.jpg"
//             required
//             {...form.getInputProps("image_url")}
//           />
//           <TextInput
//             label="Pin Name"
//             placeholder="Pin Name"
//             required
//             {...form.getInputProps("pin_name")}
//           />
//           <TextInput
//             label="Description"
//             placeholder="Description"
//             required
//             {...form.getInputProps("description")}
//           />
//           <TextInput
//             label="Category"
//             placeholder="Category"
//             required
//             {...form.getInputProps("category")}
//           />
//           <Flex direction="row" gap={10}>
//             <Checkbox
//               label="Active"
//               checked={form.values.is_active}
//               // onChange={(event) => {
//               //   form.setFieldValue("is_active", event.currentTarget.checked);
//               // }}
//               {...form.getInputProps("is_active")}
//             ></Checkbox>
//           </Flex>
//           <Flex direction="row" gap={10}>
//             <Button type="submit">Submit</Button>
//             <Button type="reset">Reset</Button>
//           </Flex>
//         </Stack>
//       </Card>
//     </form>
//   );
// }

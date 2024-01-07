import { IconTrash } from "@tabler/icons-react";
import { Button, LoadingOverlay } from "@mantine/core";
import { deletePin } from "../lib/actions";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";

export default function PopupCardDelete({
  popupId,
  userId,
  fetchPins,
  setPopupInfo,
}: {
  popupId: number;
  userId: string;
  fetchPins: () => void;
  setPopupInfo: (info: any) => void;
}) {
  const [visible, { toggle }] = useDisclosure(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = async () => {
    toggle();
    try {
      const res = await deletePin(popupId, userId);
      setIsDeleting(false);
      setPopupInfo(null);
      fetchPins();
      toggle();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <LoadingOverlay visible={visible} />
      {isDeleting ? (
        <Button onClick={handleDelete}>Confirm?</Button>
      ) : (
        <Button
          onClick={() => {
            setIsDeleting(true);
          }}
        >
          <IconTrash></IconTrash>
        </Button>
      )}
    </>
  );
}

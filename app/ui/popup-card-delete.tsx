import { IconTrash } from "@tabler/icons-react";
import { Button } from "@mantine/core";
import { deletePin } from "../lib/actions";
import { useState } from "react";

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
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = async () => {
    try {
      const res = await deletePin(popupId, userId);
      console.log("done!", res);
      setIsDeleting(false);
      setPopupInfo(null);
      fetchPins();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
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

import PopupCardDisplay from "./popup-card-display";
import PopupCardDelete from "./popup-card-delete";
import { useSession } from "next-auth/react";
import PopupCardEdit from "./popup-card-edit";
import { Group, Button } from "@mantine/core";
import { useState } from "react";

export default function PopupCard({
  popupInfo,
  fetchPins,
  setPopupInfo,
}: {
  popupInfo: any;
  fetchPins: () => void;
  setPopupInfo: (info: any) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  // console.log(popupInfo);
  const { data: session, status } = useSession();
  // console.log(session);
  return (
    <>
      {isEditing &&
      status === "authenticated" &&
      session?.user?.id === popupInfo.user_id ? (
        <>
          <PopupCardEdit
            pinData={popupInfo}
            fetchPins={fetchPins}
            setIsEditing={setIsEditing}
            setPopupInfo={setPopupInfo}
          ></PopupCardEdit>
          {/* <Button onClick={() => setIsEditing(false)}>Cancel</Button> */}
        </>
      ) : (
        <>
          <PopupCardDisplay popupInfo={popupInfo} />
          {status === "authenticated" &&
            session?.user?.id === popupInfo.user_id && (
              <Group>
                <PopupCardDelete
                  popupId={popupInfo.id}
                  userId={session.user.id}
                  fetchPins={fetchPins}
                  setPopupInfo={setPopupInfo}
                />
                <Button onClick={() => setIsEditing(true)}>Edit</Button>
              </Group>
            )}
        </>
      )}
    </>
  );
}

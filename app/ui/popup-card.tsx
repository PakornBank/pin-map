import PopupCardDisplay from "./popup-card-display";
import PopupCardDelete from "./popup-card-delete";
import { useSession } from "next-auth/react";

export default function PopupCard({
  popupInfo,
  fetchPins,
}: {
  popupInfo: any;
  fetchPins: () => void;
}) {
  console.log(popupInfo);
  const { data: session, status } = useSession();
  return (
    <>
      <PopupCardDisplay popupInfo={popupInfo} />
      {status === "authenticated" &&
        session?.user?.id === popupInfo.user_id && (
          <PopupCardDelete
            popupId={popupInfo.id}
            userId={session.user.id}
            fetchPins={fetchPins}
          />
        )}
    </>
  );
}

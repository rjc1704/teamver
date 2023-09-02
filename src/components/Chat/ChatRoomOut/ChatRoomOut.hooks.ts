import { useRouter } from "next/router";
import { useModal } from "~/components/Commons";
import { useDeleteChatMemberMutate } from "~/states/server/chat";
import { CHAT_ROOM_OUT_MODAL } from "./ChatRoomOut.constants";

export const useChatRoomOut = ({ roomId, userId }: { roomId: number; userId: string }) => {
  const { mutateAsync: DeleteChatMemberMutateAsync } = useDeleteChatMemberMutate();

  const router = useRouter();

  const { unmount } = useModal();

  const handleRoomOutClick = () => {
    DeleteChatMemberMutateAsync({ roomId, userId });

    router.back();

    unmount(CHAT_ROOM_OUT_MODAL);
  };

  return { handleRoomOutClick };
};
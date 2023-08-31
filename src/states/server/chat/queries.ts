import { useSuspendedQuery } from "~/hooks";
import {
  selectChatMessages,
  selectChatRequestsMember,
  selectChatRequestsOwner,
  selectChatRooms
} from "./apis";
import { chatKeys } from "./keys";

export const useSelectChatRequestsOwnerQuery = (
  requests: Parameters<typeof selectChatRequestsOwner>[0]
) => {
  return useSuspendedQuery({
    queryKey: chatKeys.selectChatRequestsOwner(requests),
    queryFn: () => selectChatRequestsOwner(requests)
  });
};

export const useSelectChatRequestsMemberQuery = (
  requests: Parameters<typeof selectChatRequestsMember>[0]
) => {
  return useSuspendedQuery({
    queryKey: chatKeys.selectChatRequestsMember(requests),
    queryFn: () => selectChatRequestsMember(requests)
  });
};

export const useSelectChatMessagesQuery = (roomId: number) => {
  return useSuspendedQuery({
    queryKey: chatKeys.selectChatMessages(roomId),
    queryFn: () => selectChatMessages(roomId)
  });
};

export const useSelectChatRoomsQuery = (userId: string) => {
  return useSuspendedQuery({
    queryKey: chatKeys.selectChatRooms(userId),
    queryFn: () => selectChatRooms(userId)
  });
};

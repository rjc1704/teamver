import type { User } from "@supabase/supabase-js";
import { useTranslation } from "next-i18next";
import { Avatar } from "~/components/Commons";
import type { ProfileAllDataRow } from "~/states/server/profile";
import { FlexColumn, LayoutContent, PosCenter, SizeBox, Text } from "~/styles/mixins";
import { isEmpty } from "~/utils";
import { useChatMessageBox } from "./ChatMessageBox.hooks";
import * as Styled from "./ChatMessageBox.styles";

export const ChatMessageBox = ({ user, opponent }: { user: User; opponent: ProfileAllDataRow }) => {
  const app = useChatMessageBox({ user, opponent });
  const { t } = useTranslation("chat");

  return (
    <LayoutContent>
      {isEmpty(app.chatMessages) && (
        <PosCenter>
          <Text as="p" textAlign="center" size="textMediumBold" color="gray6">
            {t("NAME님과 팀원 매칭 되었어요", { name: opponent.name })}
          </Text>

          <SizeBox height={24} />

          <Avatar size="xLarge" src={opponent.imageUrl} />
        </PosCenter>
      )}

      <FlexColumn gap={10} padding="26px 32px 7px 32px">
        {app.chatMessages.map((messageData) => {
          const isMine = messageData.sender.id === user.id;
          const isChaining = app.getIsChaining(messageData);

          return (
            <Styled.MessageContainer key={messageData.id} isMine={isMine}>
              {!isMine && (
                <SizeBox height={32} minWidth={32}>
                  {!isChaining && <Avatar size="small" src={messageData.sender.imageUrl} />}
                </SizeBox>
              )}

              <Styled.MessageBox isMine={isMine}>
                <Styled.Bubble isMine={isMine}>{messageData.message}</Styled.Bubble>

                <Text size="textSmall" color="gray6" whiteSpace="nowrap">
                  {app.getTime(messageData.createdAt)}
                </Text>
              </Styled.MessageBox>
            </Styled.MessageContainer>
          );
        })}
      </FlexColumn>

      <div ref={app.bottomRef} />
    </LayoutContent>
  );
};
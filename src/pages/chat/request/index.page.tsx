import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { User } from "@supabase/supabase-js";
import { QueryClient } from "@tanstack/react-query";
import type { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ChatRequestMember, ChatRequestOwner } from "~/components/Chat";
import { TitleHeader } from "~/components/Shared";
import { chatKeys, selectChatRequestMember } from "~/states/server/chat";
import { profileKeys, selectProfile, useSelectProfileQuery } from "~/states/server/profile";
import { LayoutContent, LayoutHeader } from "~/styles/mixins";
import type { Database } from "~/types/database";

const ChatRequest = (props: { user: User }) => {
  const { data: profile } = useSelectProfileQuery(props.user.id);

  return (
    <LayoutHeader>
      <TitleHeader title={t("채팅요청")} />

      <LayoutContent padding="49px 22px 22px 22px">
        {profile.role.id === 1 ? <ChatRequestOwner {...props} /> : <ChatRequestMember {...props} />}
      </LayoutContent>
    </LayoutHeader>
  );
};

export default ChatRequest;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient();
  const supabase = createPagesServerClient<Database>(ctx);

  const {
    data: { user }
  } = (await supabase.auth.getUser()) as { data: { user: User } };

  const profile = await queryClient.fetchQuery({
    queryKey: profileKeys.selectProfile(user.id),
    queryFn: () => selectProfile(user.id)
  });

  if (profile.role.id === 1) {
    const requestOption = { receiverId: user.id, state: "PENDING" } as const;

    const requests = queryClient.prefetchQuery({
      queryKey: chatKeys.selectChatRequestMember(requestOption),
      queryFn: () => selectChatRequestMember(requestOption)
    });

    await Promise.all([requests]);
  }

  return {
    props: {
      user: user as User,
      ...(await serverSideTranslations(ctx.locale, ["common", "chat"]))
    }
  };
};

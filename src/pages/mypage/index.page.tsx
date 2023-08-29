import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Link from "next/link";
import { Avatar, Button } from "~/components/Commons";
import { ProjectCard } from "~/components/MyPage";
import { profileKeys, selectProfile } from "~/states/server/profile";
import { projectsKey, selectMemberProjects } from "~/states/server/project";
import { Text } from "~/styles/mixins";
import type { Database } from "~/types/database";
import { useMyPage } from "./mypage.hooks";
import * as Styled from "./mypage.styles";
import type { MyPageProps } from "./mypage.types";

function MyPage({ userId }: MyPageProps) {
  const { t } = useTranslation("mypage");

  const PROJECT_TAB = [
    { name: t("진행중인 프로젝트"), id: 0 },
    { name: t("지난 프로젝트"), id: 1 }
  ];

  const app = useMyPage(userId);

  return (
    <>
      <Head>
        <title>{t("마이페이지")}</title>
      </Head>

      <Styled.Container>
        <Avatar src={app.user.imageUrl} size="large" />
        <Text as="h2" size="heading3">
          {app.user.name}
        </Text>

        <Button>
          <Link href="/mypage/profile/edit">{t("프로필 수정")}</Link>
        </Button>

        <Styled.TabButtonContainer>
          {PROJECT_TAB.map((tab) => (
            <Text
              key={tab.id}
              as="button"
              className={app.tabState === tab.id ? "clicked" : "submenu"}
              onClick={() => app.setTabState(tab.id)}
            >
              {tab.name}
            </Text>
          ))}
          <Styled.SelectedBorder tabState={app.tabState} />
        </Styled.TabButtonContainer>

        <Styled.ProjectContainer>
          {app.tabState === 0
            ? app.proceedProjects.map((project) => (
                <ProjectCard project={project} key={project.id} />
              ))
            : app.doneProjects.map((project) => <ProjectCard project={project} key={project.id} />)}
        </Styled.ProjectContainer>
      </Styled.Container>
    </>
  );
}

export default MyPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient();

  const supabaseClient = createPagesServerClient<Database>(ctx);

  const {
    data: { session }
  } = await supabaseClient.auth.getSession();

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    };
  }

  await queryClient.prefetchQuery({
    queryKey: projectsKey.selectMemberProjects(session.user.id),
    queryFn: () => selectMemberProjects(session.user.id)
  });
  await queryClient.prefetchQuery({
    queryKey: profileKeys.selectProfile(session.user.id),
    queryFn: () => selectProfile(session.user.id)
  });

  return {
    props: {
      userId: session.user.id,
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(ctx.locale, ["mypage"]))
    }
  };
};
import type { User } from "@supabase/auth-helpers-nextjs";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Member, Owner } from "~/components/ProjectMembers";

import { useSelectProfileQuery } from "~/states/server/profile";
import type { Database } from "~/types/database";

const ProjectMembers = (props: { user: User; projectId: string }) => {
  const { data: profile } = useSelectProfileQuery(props.user.id);

  if (profile.role.id === 1) {
    return <Owner {...props} />;
  }

  return <Member {...props} />;
};

export default ProjectMembers;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const supabaseServer = createPagesServerClient<Database>(context);

  const { projectId } = context.query;

  const {
    data: { user }
  } = await supabaseServer.auth.getUser();

  return {
    props: {
      projectId,
      user: user as User,
      ...(await serverSideTranslations(context.locale, ["common", "project"]))
    }
  };
};

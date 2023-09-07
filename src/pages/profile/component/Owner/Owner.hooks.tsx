import type { User } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { routes } from "~/constants/routes";
import { useSelectProfileQuery } from "~/states/server/profile";
import { useSelectOwnerProjectsQuery } from "~/states/server/project";

export const useOwner = () => {
  const [selectedTab, setSelectedTab] = useState("IN_PROJECT");

  const user = useUser() as User;
  const router = useRouter();

  const userId = router.query.userId as string;

  const { data: profile } = useSelectProfileQuery(userId);
  const { data: projects } = useSelectOwnerProjectsQuery(userId);

  const isMine = userId === user.id;

  const handleProjectCreate = () => {
    router.push(routes.projectCreate);
  };

  const inRecruit = projects.filter((project) => project.state === "IN_RECRUIT");
  const doneRecruit = projects.filter((project) => project.state === "DONE_RECRUIT");
  const doneProjects = projects.filter((project) => project.state === "DONE_PROJECT");

  return {
    profile,
    projects,
    inRecruit,
    doneRecruit,
    doneProjects,
    isMine,
    selectedTab,
    setSelectedTab,
    handleProjectCreate
  };
};
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useSuspendedQuery } from "~/hooks";
import {
  selectFollowProjects,
  selectMemberProjects,
  selectOwnerProjects,
  selectProject,
  selectProjectInvites,
  selectRecommendedProjects
} from "./apis";
import { projectsKey } from "./keys";

export const useSelectProjectQuery = (projectId: number) => {
  return useSuspendedQuery({
    queryKey: projectsKey.selectProject(projectId),
    queryFn: () => selectProject(projectId)
  });
};

export const useSelectOwnerProjectsQuery = (myId: string) => {
  return useQuery({
    queryKey: projectsKey.selectOwnerProjects(myId),
    queryFn: () => selectOwnerProjects(myId),
    initialData: []
  });
};

export const useSelectMemberProjectsQuery = (myId: string) => {
  return useQuery({
    queryKey: projectsKey.selectMemberProjects(myId),
    queryFn: () => selectMemberProjects(myId),
    initialData: []
  });
};

export const useSelectFollowProjectsQuery = (myId: string) => {
  return useQuery({
    queryKey: projectsKey.selectFollowProjects(myId),
    queryFn: () => selectFollowProjects(myId),
    initialData: []
  });
};

export const useSelectRecommendedProjectsQuery = (
  filter: Parameters<typeof selectRecommendedProjects>[0]
) => {
  return useInfiniteQuery({
    queryKey: projectsKey.selectRecommendedProjects(filter),
    queryFn: ({ pageParam }) => selectRecommendedProjects({ pageParam, limit: 10, ...filter }),
    getNextPageParam: (page) => page.nextPage
  });
};

export const useSelectProjectInvitesQuery = (receiverId: string) => {
  return useQuery({
    queryKey: projectsKey.selectProjectInvites(receiverId),
    queryFn: () => selectProjectInvites(receiverId),
    initialData: []
  });
};

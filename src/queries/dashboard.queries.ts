import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProgram, getFeedbackAnalytics, getPrograms, getUserProfile, getUserTotalCount, getAllPrograms, getRecentFeedbackPaginated } from "@/services/dashboard.service";
import { ProgramData } from "@/types/feedback";

export const useFeedbackAnalytics = () => {
  return useQuery({
    queryKey: ["feedback-analytics"],
    queryFn: getFeedbackAnalytics,
  });
};

export const usePrograms = (page: number = 1, pageSize: number = 10) => {
  return useQuery({
    queryKey: ["programs", page, pageSize],
    queryFn: () => getPrograms(page, pageSize),
  });
};

export const useUserProfile = () => {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: getUserProfile,
  });
};

export const useUserTotalCount = () => {
  return useQuery({
    queryKey: ["user-total-count"],
    queryFn: getUserTotalCount,
  });
};

export const useAllPrograms = () => {
  return useQuery({
    queryKey: ["all-programs"],
    queryFn: getAllPrograms,
  });
};

export const useRecentFeedbackPaginated = (page: number = 1, pageSize: number = 5) => {
  return useQuery({
    queryKey: ["recent-feedback-paginated", page, pageSize],
    queryFn: () => getRecentFeedbackPaginated(page, pageSize),
  });
};

export const useCreateProgram = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: ProgramData) => createProgram(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["programs"] });
    },
  });
};
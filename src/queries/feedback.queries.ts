import {
  FeedbackData,
  getFeedback,
  getFeedbackAverageRating,
  postFeedback,
} from "@/services/feedback.service";
import { useMutation, useQuery } from "@tanstack/react-query";

export const usePostFeedback = () => {
  return useMutation({
    mutationFn: (data: FeedbackData) => postFeedback(data),
    onSuccess: (response) => {
      return response;
    },
    onError: (error) => {
      throw error;
    },
  });
};

export const useGetFeedback = () => {
  return useQuery({
    queryKey: ["feedback"],
    queryFn: () => getFeedback(),
  });
};
export const useGetFeedbackAverageRating = () => {
  return useQuery({
    queryKey: ["feedback-average-rating"],
    queryFn: () => getFeedbackAverageRating(),
  });
};

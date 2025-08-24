import {
  ConversationPayload,
  nextConversation,
  startConversation,
} from "@/services/conversation.service";
import { useMutation } from "@tanstack/react-query";

export const useStartConversation = () => {
  return useMutation({
    mutationFn: () => startConversation(),
    onSuccess: (response) => {
      return response;
    },
    onError: (error) => {
      throw error;
    },
  });
};

export const useNextConversation = () => {
  return useMutation({
    mutationFn: (data: ConversationPayload) => nextConversation(data),
    onSuccess: (response) => {
      return response;
    },
    onError: (error) => {
      throw error;
    },
  });
};

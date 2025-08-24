import axiosInstance from "@/config/axios";

export interface ConversationPayload {
  conversationId: string;
  question: string;
}

export const startConversation = async () => {
  try {
    const response = await axiosInstance.post("/conversation/start");
    return response;
  } catch (error) {
    throw error;
  }
};

export const nextConversation = async (payload: ConversationPayload) => {
  try {
    const response = await axiosInstance.post("/conversation/next", {
      payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

import { create } from "zustand";
type Conversation = {
  conversationId: string;
  question: string;
};
type ConversationState = {
  conversationId: string;
  question: string;
  setConversationState: (state: ConversationState) => void;
};

export const useConversationState = create<ConversationState>((set) => ({
  conversationId: "",
  question: "",
  setConversationState: (state: Conversation) =>
    set(() => ({
      conversationId: state.conversationId,
      question: state.question,
    })),
}));

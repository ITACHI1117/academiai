import { ArrowLeft, MessageSquare } from "lucide-react";
import { useToast } from "../ui/toast";
import { useRouter } from "next/navigation";
import { useStartConversation } from "@/queries/conversation.queries";
import { useEffect } from "react";
import { useConversationState } from "@/store/conversationStore";

export const StartConvo = ({
  setView,
}: {
  setView: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { toast } = useToast();
  const router = useRouter();

  const StartConvoQuery = useStartConversation();
  const { setConversationState } = useConversationState();

  const handleStartConvo = () => {
    toast({
      title: "Starting Conversation",
      // description: "The conversation feature is under development. Stay tuned!",
      duration: 4000,
      variant: "info",
    });
    StartConvoQuery.mutate();
    // router.push("/dashboard/conversation");
  };

  useEffect(() => {
    if (StartConvoQuery.isSuccess) {
      console.log(StartConvoQuery.data);
      setConversationState(StartConvoQuery.data.data);
      toast({
        title: "Conversation Started",
        description: "Redirecting to AI chat...",
        duration: 4000,
        variant: "success",
      });
      router.push("/dashboard/conversation");
    }
  }, [StartConvoQuery.isSuccess]);

  return (
    <div className="min-h-screen bg-transparent  flex items-center justify-center">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Icon */}
        <div className="mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Get Your Personalized Recommendations
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-xl mx-auto">
          Our AI will ask you a series of questions to understand your goals,
          preferences, and background. This helps us recommend the most suitable
          postgraduate programs for you.
        </p>

        <div className="md:flex w-full max-w-5xl mx-auto space-x-4 justify-center">
          {/* Back Button */}
          <button
            onClick={() => setView("Dashboard")}
            className="cursor-pointer bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            DashBoard
          </button>
          {/* Start Button */}
          <button
            onClick={handleStartConvo}
            className="cursor-pointer bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center"
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            Start Conversation
          </button>
        </div>
      </div>
    </div>
  );
};

import { ArrowRight, MessageSquare, RotateCcw } from "lucide-react";
import { useToast } from "../ui/toast";

export const Dash = ({
  setView,
}: {
  setView: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { toast } = useToast();
  const handleContinueSession = () => {
    toast({
      title: "Feature Coming Soon",
      description:
        "The resume session feature is under development. Stay tuned!",
      duration: 4000,
      variant: "info",
    });
  };
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header Section */}
      <div className="text-center mb-12 mt-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Welcome to Your Dashboard
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Ready to discover your perfect postgraduate program? Let's start with
          a few questions about your goals and preferences.
        </p>
      </div>

      {/* Action Cards */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Start New Recommendation Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-start space-x-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-green-200 rounded-xl flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Start New Recommendation
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Begin a personalized conversation to get AI-powered program
                recommendations tailored to your profile.
              </p>
            </div>
          </div>

          <button
            onClick={() => setView("StartConvo")}
            className="cursor-pointer w-full bg-primary from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
          >
            Start Conversation
            <ArrowRight className="inline-block w-4 h-4 ml-2" />
          </button>
        </div>

        {/* Resume Previous Session Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-start space-x-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-green-200 rounded-xl flex items-center justify-center flex-shrink-0">
              <RotateCcw className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Resume Previous Session
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Continue where you left off if you have an ongoing
                recommendation conversation.
              </p>
            </div>
          </div>

          <button
            onClick={handleContinueSession}
            className=" cursor-pointer w-full bg-white border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 transform hover:scale-[1.02]"
          >
            Continue Session
          </button>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="mt-16 text-center">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 p-8 max-w-2xl mx-auto">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">
            How does it work?
          </h4>
          <p className="text-gray-600 mb-4">
            Our AI will ask you about your academic background, career goals,
            interests, and preferences. Based on your responses, we'll provide
            personalized program recommendations from Nigerian universities.
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <span className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              5-10 minutes
            </span>
            <span className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              Personalized results
            </span>
            <span className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Save & resume anytime
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

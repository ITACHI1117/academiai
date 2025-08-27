"use client";
import { useToast } from "@/components/ui/toast";
import { useNextConversation } from "@/queries/conversation.queries";
import { useConversationState } from "@/store/conversationStore";
import { useRecommendationState } from "@/store/recommendationStore";
import {
  Bot,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { NotFoundConvo } from "./NotFoundConvo";

export const Convo = () => {
  const { conversationId, question } = useConversationState();
  const [activeQuestion, setActiveQuestion] = useState(question);
  const [answer, setAnswer] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const totalQuestions = 4; //this is set to 4 for now, can be dynamic based on backend (currently it is for on the backend)
  const router = useRouter();

  const NextQuestionQuery = useNextConversation();
  const { setRecommendations } = useRecommendationState();

  const { toast } = useToast();

  useEffect(() => {
    console.log(question);
    console.log(conversationId);
  }, [question]);

  // Sample question - this would come from your backend
  //   const question =
  //     "What is your current academic background? Please tell us about your undergraduate degree, major field of study, and any relevant academic achievements.";

  const handleNext = async () => {
    // Call API to get next question
    // For the last question, send placeholder text if blank
    const userInput = currentQuestion === totalQuestions && answer.trim() === '' 
      ? 'No specific preference' 
      : answer;
      
    await NextQuestionQuery.mutateAsync({
      conversationId: conversationId,
      userInput: userInput,
    });
    setCurrentQuestion(currentQuestion + 1); //this is bacically used for the progress bar
    setAnswer(""); // Clear answer for next question
    if (currentQuestion < totalQuestions) {
      // // Call API to get next question
      // await NextQuestionQuery.mutateAsync({
      //   conversationId: conversationId,
      //   userInput: answer,
      // });
      // setCurrentQuestion(currentQuestion + 1); //this is bacically used for the progress bar
      // setAnswer(""); // Clear answer for next question
    } else {
      // await NextQuestionQuery.mutateAsync({
      //   conversationId: conversationId,
      //   userInput: answer,
      // });
      // Complete the assessment logic here
      //   router.push("/dashboard/recommendations");
    }
  };

  const handlePrevious = () => {
    // if (currentQuestion > 1) {
    //   setCurrentQuestion(currentQuestion - 1);
    // }
    toast({
      title: "Previous Question",
      description:
        "You can't go back to the previous question. Please proceed or quit the assessment and start again.",
      duration: 3000,
      variant: "info",
    });
  };

  const progressPercentage = (currentQuestion / totalQuestions) * 100;

  const handleQuitConvo = () => {
    router.back();
  };

  useEffect(() => {
    if (NextQuestionQuery.isSuccess) {
      console.log(NextQuestionQuery.data);
      if (NextQuestionQuery.data.data.recommendations === null) {
        setActiveQuestion(NextQuestionQuery.data.data.nextQuestion);
      } else {
        // Complete the assessment logic here
        console.log(NextQuestionQuery.data);
        setRecommendations(NextQuestionQuery.data.data.recommendations);
        router.push("/dashboard/recommendations");
      }
    }
  }, [NextQuestionQuery.isSuccess]);

  if (
    activeQuestion === null ||
    activeQuestion === undefined ||
    activeQuestion === ""
  ) {
    return <NotFoundConvo />;
  }

  return (
    <div className="bg-transparent">
      {/* Header with Progress */}
      <div className="bg-card/95 backdrop-blur-md border-b pt-10 md:pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-sm">
                <MessageSquare className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-foreground text-lg">
                  Academic Profile Assessment
                </h1>
                <p className="text-sm text-muted-foreground">Personalized program recommendations</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-foreground">
                Question {currentQuestion} of {totalQuestions}
              </div>
              <div className="text-xs text-muted-foreground">
                {Math.round(progressPercentage)}% complete
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-muted rounded-full h-3 shadow-inner">
            <div
              className="bg-primary h-3 rounded-full transition-all duration-500 ease-out shadow-sm"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Question Section */}
        <div className="bg-card shadow-xs border rounded-2xl p-8 mb-8">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <div className="mb-3">
                <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                  AI Assistant
                </span>
              </div>
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                <p className="text-lg text-foreground leading-relaxed font-medium">
                  {activeQuestion}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Answer Section */}
        <div className="bg-card shadow-xs border rounded-2xl p-8 mb-8">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center flex-shrink-0 mt-2">
              <User className="w-6 h-6 text-accent-foreground" />
            </div>
            <div className="flex-1">
              <div className="mb-3">
                <span className="text-sm font-medium text-accent-foreground bg-accent px-3 py-1 rounded-full">
                  Your Response
                </span>
              </div>
              <textarea
                id="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder={currentQuestion === totalQuestions ? "Enter your preferred course of study (optional)..." : "Please provide detailed information..."}
                className="w-full h-36 p-4 border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary resize-none text-foreground placeholder-muted-foreground bg-background transition-all duration-200"
                rows={4}
              />
              <div className="flex justify-between items-center mt-3">
                <div className="text-sm text-muted-foreground">
                  {answer.length} characters
                </div>
                <div className="flex items-center space-x-3">
                  {answer.length > 0 && (
                    <div className="text-sm text-primary font-medium flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                      Answer provided
                    </div>
                  )}
                  {currentQuestion === totalQuestions && answer.trim() === '' && (
                    <div className="text-sm text-primary/70 font-medium flex items-center">
                      <div className="w-2 h-2 bg-primary/70 rounded-full mr-2"></div>
                      Optional field
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 1 || NextQuestionQuery.isPending}
            className={`flex items-center px-8 py-4 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none ${
              currentQuestion === 1
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-card border-2 border-border text-foreground hover:bg-accent transform hover:scale-[1.02]"
            }`}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </button>

          <div className=" hidden md:flex items-center space-x-2 text-sm text-gray-600">
            <span>Click Here </span>
            <kbd
              onClick={handleQuitConvo}
              className="px-2 py-1 bg-red-100  border  border-red-400 text-xs cur"
            >
              Esc
            </kbd>
            <span>to Quit Convo</span>
          </div>

          <button
            onClick={handleNext}
            disabled={(currentQuestion < totalQuestions && answer.trim().length === 0) || NextQuestionQuery.isPending}
            className={`flex items-center px-8 py-4 rounded-xl font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none ${
              (currentQuestion < totalQuestions && answer.trim().length === 0)
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-primary text-primary-foreground hover:bg-primary/90 transform hover:scale-[1.02] shadow-sm hover:shadow-md"
            }`}
          >
            {NextQuestionQuery.isPending ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                {currentQuestion === totalQuestions ? "Generating Recommendations..." : "Processing..."}
              </>
            ) : (
              currentQuestion === totalQuestions ? "Complete Assessment" : "Next"
            )}
            <ChevronRight className="w-4 h-4 ml-2" />
          </button>
        </div>

        <div className=" w-full flex md:hidden items-center justify-center mt-4 space-x-2 text-sm text-gray-600">
          <span>Click Here </span>
          <kbd
            onClick={handleQuitConvo}
            className="px-2 py-1 bg-red-100  border border-red-400 text-xs"
          >
            Esc
          </kbd>
          <span>to Quit Convo</span>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-center">
          <div className="bg-white/60 backdrop-blur-sm  border border-white/20 p-4 max-w-2xl mx-auto">
            <p className="text-sm text-gray-600">
              💡 <strong>Tip:</strong> The more detailed your answers, the
              better our AI can tailor recommendations to your specific needs
              and goals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

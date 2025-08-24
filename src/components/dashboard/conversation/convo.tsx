"use client";
import {
  Bot,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Convo = () => {
  const [answer, setAnswer] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const totalQuestions = 4; //this is set to 4 for now, can be dynamic based on backend (currently it is for on the backend)
  const router = useRouter();

  // Sample question - this would come from your backend
  const question =
    "What is your current academic background? Please tell us about your undergraduate degree, major field of study, and any relevant academic achievements.";

  const handleNext = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswer(""); // Clear answer for next question
    } else {
      // Complete the assessment logic here
      router.push("/dashboard/recommendations");
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progressPercentage = (currentQuestion / totalQuestions) * 100;

  const handleQuitConvo = () => {
    router.back();
  };

  return (
    <div className="bg-transparent">
      {/* Header with Progress */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 pt-10 md:pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-gray-900">
                Academic Profile Assessment
              </span>
            </div>
            <div className="text-sm text-gray-600">
              Question {currentQuestion} of {totalQuestions}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200  h-2">
            <div
              className="bg-gradient-to-r from-green-300 to-green-600 h-2  transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Question Section */}
        <div className="bg-white shadow-lg border border-gray-200 p-8 mb-8">
          <div className="flex items-start space-x-4 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center flex-shrink-0">
              <Bot className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="bg-primary p-6 border border-primary-200 ">
                <p className="text-lg text-primary-foreground leading-relaxed">
                  {question}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Answer Section */}
        <div className="bg-white  shadow-lg border border-gray-200 p-8 mb-8">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-green-100 to-green-200  flex items-center justify-center flex-shrink-0 mt-2">
              <User className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <label
                htmlFor="answer"
                className="block text-sm font-semibold text-gray-700 mb-3"
              >
                Your Answer
              </label>
              <textarea
                id="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Please provide detailed information about your academic background..."
                className="w-full h-32 p-4 border border-gray-300  focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-700 placeholder-gray-400"
                rows={4}
              />
              <div className="flex justify-between items-center mt-2">
                <div className="text-sm text-gray-500">
                  {answer.length} characters
                </div>
                {answer.length > 0 && (
                  <div className="text-sm text-green-600 font-medium">
                    ✓ Answer provided
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 1}
            className={`flex items-center px-6 py-3  font-semibold transition-all duration-200 ${
              currentQuestion === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 transform hover:scale-105"
            }`}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </button>

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Click Here </span>
            <kbd
              onClick={handleQuitConvo}
              className="px-2 py-1 bg-gray-100  border text-xs"
            >
              Esc
            </kbd>
            <span>to Quit Convo</span>
          </div>

          <button
            onClick={handleNext}
            disabled={answer.trim().length === 0}
            className={`flex items-center px-6 py-3  font-semibold transition-all duration-200 cursor-pointer ${
              answer.trim().length === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : currentQuestion === totalQuestions
                ? "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transform hover:scale-105 shadow-lg hover:shadow-xl"
                : "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transform hover:scale-105 shadow-lg hover:shadow-xl"
            }`}
          >
            {currentQuestion === totalQuestions
              ? "Complete Assessment"
              : "Next"}
            <ChevronRight className="w-4 h-4 ml-2" />
          </button>
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

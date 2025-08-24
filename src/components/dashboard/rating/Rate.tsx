"use client";
import { useToast } from "@/components/ui/toast";
import { usePostFeedback } from "@/queries/feedback.queries";
import { MessageSquare, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const Rate = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const router = useRouter();

  const { toast } = useToast();

  const FeedBackQuery = usePostFeedback();

  const handleStarClick = (starIndex: number) => {
    setRating(starIndex);
  };

  const handleStarHover = (starIndex: number) => {
    setHoverRating(starIndex);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Please provide a rating before submitting.");
      return;
    }
    FeedBackQuery.mutate({
      message: feedback,
      rating: rating,
    });
    // Handle feedback submission
    console.log("Feedback submitted:", { rating, feedback });
    // alert("Thank you for your feedback!");
  };

  useEffect(() => {
    if (FeedBackQuery.isSuccess) {
      toast({
        title: "Feedback submitted successfully",
        variant: "success",
      });
      router.push("/dashboard");
    }
  }, [FeedBackQuery.isSuccess]);

  useEffect(() => {
    if (FeedBackQuery.isError) {
      toast({
        title: "Error submitting feedback",
        description:
          FeedBackQuery.error?.message ||
          FeedBackQuery.error?.data?.error ||
          "Something went wrong",
        variant: "destructive",
      });
      console.log("Error submitting feedback", FeedBackQuery.error);
    }
  }, [FeedBackQuery.isError, FeedBackQuery.error]);

  const handleSkip = () => {
    // Handle skip action
    router.push("/dashboard");
    // This would typically navigate back to dashboard or previous page
  };

  const getRatingText = (ratingValue: number) => {
    const ratingTexts = {
      1: "Poor",
      2: "Fair",
      3: "Good",
      4: "Very Good",
      5: "Excellent",
    };
    return ratingTexts[ratingValue] || "";
  };
  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center py-12 pt-10 md:pt-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header Section */}
        <div className="text-center mb-8">
          {/* Icon */}
          <div className="mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Title and Description */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Share Your Feedback
          </h1>
          <p className="text-lg text-gray-600 max-w-lg mx-auto leading-relaxed">
            Help us improve LLM Advisor by sharing your experience with our
            recommendation system.
          </p>
        </div>

        {/* Feedback Form */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          {/* Rate Your Experience Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Rate Your Experience
            </h2>

            <div className="mb-4">
              <p className="text-gray-700 mb-4">
                How would you rate our recommendation system?
              </p>

              {/* Star Rating */}
              <div className="flex items-center justify-center space-x-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleStarClick(star)}
                    onMouseEnter={() => handleStarHover(star)}
                    onMouseLeave={handleStarLeave}
                    className="p-1 transition-transform duration-200 hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 transition-colors duration-200 ${
                        star <= (hoverRating || rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* Rating Text */}
              {(rating > 0 || hoverRating > 0) && (
                <div className="text-center">
                  <span className="text-sm font-medium text-gray-600">
                    {getRatingText(hoverRating || rating)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Additional Feedback Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Tell us more about your experience (optional)
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Share your thoughts about the recommendations, user experience, or
              suggestions for improvement...
            </p>

            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Please share your detailed feedback here..."
              className="w-full h-32 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-700 placeholder-gray-400"
              rows={4}
            />

            <div className="flex justify-between items-center mt-2">
              <div className="text-sm text-gray-500">
                {feedback.length} characters
              </div>
              {feedback.length > 0 && (
                <div className="text-sm text-green-600 font-medium">
                  ✓ Optional feedback provided
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <button
              onClick={handleSkip}
              className=" cursor-pointer px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
            >
              Go To Dashboard
            </button>

            <button
              onClick={handleSubmit}
              disabled={rating === 0 || FeedBackQuery.isPending}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 cursor-pointer ${
                rating === 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transform hover:scale-105 shadow-lg hover:shadow-xl"
              }`}
            >
              {FeedBackQuery.isPending ? "Submitting..." : "Submit Feedback"}
            </button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 p-4 max-w-lg mx-auto">
            <p className="text-sm text-gray-600">
              🔒 Your feedback is anonymous and helps us improve the experience
              for all users.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

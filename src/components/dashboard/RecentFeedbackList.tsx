"use client";
import { useRecentFeedbackPaginated } from "@/queries/dashboard.queries";
import { Star, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

export const RecentFeedbackList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: feedbackData, isLoading, error } = useRecentFeedbackPaginated(currentPage, 5);
  
  const feedbacks = feedbackData?.items || [];
  const pagination = feedbackData || {};
  
  console.log('Feedback data:', feedbackData);
  console.log('Pagination:', pagination);
  console.log('Total pages:', pagination.totalPages);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-green-200 rounded-xl flex items-center justify-center mr-4">
            <MessageSquare className="w-6 h-6 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Recent Feedbacks</h2>
        </div>
        <div className="text-center py-12">
          <div className="text-lg text-gray-600">Loading feedbacks...</div>
        </div>
      </div>
    );
  }

  if (error || !feedbacks) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-green-200 rounded-xl flex items-center justify-center mr-4">
            <MessageSquare className="w-6 h-6 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Recent Feedbacks</h2>
        </div>
        <div className="text-center py-12">
          <div className="text-lg text-red-600">Failed to load feedbacks</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl shadow-xs border p-8 hover:shadow-md transition-all duration-300">
      <div className="flex items-center mb-8">
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4">
          <MessageSquare className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          Recent Feedbacks ({Array.isArray(feedbacks) ? feedbacks.length : 0})
        </h2>
      </div>
      
      {!Array.isArray(feedbacks) || feedbacks.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500 text-lg">No feedbacks found</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Array.isArray(feedbacks) && feedbacks.map((feedback, index) => (
            <div key={index} className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-100 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {feedback.userName?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{feedback.userName || 'Anonymous'}</div>
                    <StarRating rating={feedback.rating || 0} />
                  </div>
                </div>
                <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full">
                  {formatDate(feedback.createdAt)}
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed pl-14">{feedback.comment}</p>
            </div>
          ))}
        </div>
      )}
      
      {/* Pagination Controls */}
      {(
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Page {pagination.pageNumber || currentPage} of {pagination.totalPages || 1} ({pagination.totalCount || feedbacks.length} total)
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage <= 1}
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={false}
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
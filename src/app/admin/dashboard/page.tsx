"use client";
import { ProgramForm } from "@/components/dashboard/ProgramForm";
import { ProgramList } from "@/components/dashboard/ProgramList";
import { RecentFeedbackList } from "@/components/dashboard/RecentFeedbackList";
import { useFeedbackAnalytics, useAllPrograms, useUserTotalCount } from "@/queries/dashboard.queries";
import { Star, TrendingUp, Users, MessageSquare, BookOpen, BarChart3 } from "lucide-react";
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

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const { data: feedbackData, isLoading: feedbackLoading } = useFeedbackAnalytics();
  const { data: programs } = useAllPrograms();
  const { data: userCount } = useUserTotalCount();
  


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Admin Control Panel
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Manage programs, monitor feedback, and oversee platform operations
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-card rounded-lg border p-1 shadow-xs">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                  activeTab === 'overview'
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                <BarChart3 className="w-4 h-4 inline mr-2" />
                Overview
              </button>
              <button
                onClick={() => setActiveTab('programs')}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                  activeTab === 'programs'
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                <BookOpen className="w-4 h-4 inline mr-2" />
                Programs
              </button>
              <button
                onClick={() => setActiveTab('feedback')}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                  activeTab === 'feedback'
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                <MessageSquare className="w-4 h-4 inline mr-2" />
                Feedback
              </button>
            </div>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-12">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900">{userCount?.totalUsers || 0}</div>
                    <div className="text-sm text-gray-500">Total Users</div>
                  </div>
                </div>
                <div className="text-xs text-green-600">Active users</div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-green-200 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900">{Array.isArray(programs) ? programs.length : 0}</div>
                    <div className="text-sm text-gray-500">Programs</div>
                  </div>
                </div>
                <div className="text-xs text-blue-600">Available programs</div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900">{feedbackData?.totalFeedbacks || 0}</div>
                    <div className="text-sm text-gray-500">Total Feedback</div>
                  </div>
                </div>
                <div className="text-xs text-purple-600">{feedbackData?.averageRating || 0} avg rating</div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-100 to-orange-200 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900">{feedbackData?.summary.positivePercentage || 0}%</div>
                    <div className="text-sm text-gray-500">Satisfaction</div>
                  </div>
                </div>
                <div className="text-xs text-green-600">Positive feedback rate</div>
              </div>
            </div>

            {/* Recent Activity */}
            {feedbackData && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-100 to-green-200 rounded-lg flex items-center justify-center mr-3">
                    <MessageSquare className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Recent Feedback</h3>
                </div>
                <div className="space-y-4">
                  {feedbackData.recentFeedbacks.slice(0, 3).map((feedback) => (
                    <div key={feedback.id} className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 border border-gray-100">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-xs">
                              {feedback.userName.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{feedback.userName}</div>
                            <StarRating rating={feedback.rating} />
                          </div>
                        </div>
                        <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full">
                          {formatDate(feedback.createdAt)}
                        </div>
                      </div>
                      <p className="text-gray-700 pl-11">{feedback.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Programs Tab */}
        {activeTab === 'programs' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ProgramForm />
            <ProgramList />
          </div>
        )}

        {/* Feedback Tab */}
        {activeTab === 'feedback' && (
          <div>
            {feedbackLoading ? (
              <div className="text-center py-12">
                <div className="text-lg text-gray-600">Loading feedback analytics...</div>
              </div>
            ) : feedbackData ? (
              <div className="space-y-8">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-gray-900">{feedbackData.totalFeedbacks}</div>
                        <div className="text-sm text-gray-500">Total Feedbacks</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-xl flex items-center justify-center">
                        <Star className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div className="text-right">
                        <div className="flex items-center justify-end space-x-2 mb-1">
                          <span className="text-3xl font-bold text-gray-900">{feedbackData.averageRating}</span>
                          <StarRating rating={Math.round(feedbackData.averageRating)} />
                        </div>
                        <div className="text-sm text-gray-500">Average Rating</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-green-200 rounded-xl flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-green-600">{feedbackData.summary.positivePercentage}%</div>
                        <div className="text-sm text-gray-500">Positive Rate</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
                        <MessageSquare className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-purple-600">{feedbackData.summary.satisfactionScore}</div>
                        <div className="text-sm text-gray-500">Satisfaction Score</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rating Distribution */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-100 to-orange-200 rounded-lg flex items-center justify-center mr-3">
                      <Star className="w-5 h-5 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Rating Distribution</h3>
                  </div>
                  <div className="space-y-4">
                    {Object.entries(feedbackData.ratingDistribution)
                      .reverse()
                      .map(([key, value], index) => {
                        const starCount = 5 - index;
                        const percentage = feedbackData.totalFeedbacks > 0 ? (value / feedbackData.totalFeedbacks) * 100 : 0;
                        return (
                          <div key={key} className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2 w-20">
                              <span className="text-sm font-medium">{starCount}</span>
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            </div>
                            <div className="flex-1 bg-gray-100 rounded-full h-3">
                              <div
                                className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full transition-all duration-500"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="text-sm font-semibold text-gray-700 w-12 text-right">{value}</span>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* All Recent Feedbacks */}
                <RecentFeedbackList />
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-lg text-red-600">Failed to load feedback data</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
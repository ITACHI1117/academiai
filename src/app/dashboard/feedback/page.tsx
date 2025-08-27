"use client";
import { FeedbackDashboard } from "@/components/dashboard/FeedbackDashboard";
import { useFeedbackAnalytics } from "@/queries/dashboard.queries";

export default function FeedbackPage() {
  const { data, isLoading, error } = useFeedbackAnalytics();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-600">Failed to load dashboard data</div>
      </div>
    );
  }

  return <FeedbackDashboard data={data} />;
}
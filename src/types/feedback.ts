export interface FeedbackData {
  totalFeedbacks: number;
  averageRating: number;
  ratingDistribution: {
    oneStar: number;
    twoStar: number;
    threeStar: number;
    fourStar: number;
    fiveStar: number;
  };
  monthlyTrends: Array<{
    month: string;
    count: number;
    averageRating: number;
  }>;
  recentFeedbacks: Array<{
    id: string;
    rating: number;
    comment: string;
    createdAt: string;
    userName: string;
  }>;
  summary: {
    highRatings: number;
    mediumRatings: number;
    lowRatings: number;
    positivePercentage: number;
    satisfactionScore: number;
  };
}

export interface ProgramData {
  program_name: string;
  degree_type: string;
  study_mode: string;
  field: string;
}
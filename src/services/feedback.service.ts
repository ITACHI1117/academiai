import axiosInstance from "@/config/axios";

export interface FeedbackData {
  message: string;
  rating: number;
}

export const postFeedback = async (data: FeedbackData) => {
  try {
    const response = await axiosInstance.post("/feedback", data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getFeedback = async () => {
  try {
    const response = await axiosInstance.get("/feedback");
    return response;
  } catch (error) {
    throw error;
  }
};

export const getFeedbackAverageRating = async () => {
  try {
    const response = await axiosInstance.get("/feedback/average-rating");
    return response;
  } catch (error) {
    throw error;
  }
};

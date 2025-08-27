import axiosInstance from "@/config/axios";
import { FeedbackData, ProgramData } from "@/types/feedback";

export const getFeedbackAnalytics = async (): Promise<FeedbackData> => {
  const response = await axiosInstance.get("/feedback/analytics");
  return response.data;
};

export const getRecentFeedbackPaginated = async (page: number = 1, pageSize: number = 5) => {
  const response = await axiosInstance.get(`/feedback/recent/paginated?PageNumber=${page}&PageSize=${pageSize}`);
  return response.data;
};

export const getPrograms = async (page: number = 1, pageSize: number = 10) => {
  const response = await axiosInstance.get(`/programs/paginated?PageNumber=${page}&PageSize=${pageSize}`);
  return response.data;
};

export const createProgram = async (data: ProgramData): Promise<ProgramData> => {
  const response = await axiosInstance.post("/dashboard/programs/create", data);
  return response.data;
};

export const getUserProfile = async () => {
  const response = await axiosInstance.get("/user/profile");
  return response.data;
};

export const getUserTotalCount = async () => {
  const response = await axiosInstance.get("/user/total-count");
  return response.data;
};

export const getAllPrograms = async (): Promise<ProgramData[]> => {
  const response = await axiosInstance.get("/programs");
  return response.data;
};
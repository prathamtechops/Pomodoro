import { Schema } from "mongoose";

export interface GetUser {
  clerkId: string;
}

export interface CreateUserParams {
  clerkId: string;
  username: string;
  email: string;
  picture: string;
}

export interface UpdateStudyTimeParams {
  userId: string;
  studyTime: number;
  repetitions: number;
}

export interface GetDurationByDateParams {
  userId: Schema.Types.ObjectId;
  startDate?: Date;
  endDate?: Date;
}

export interface StudyDuration {
  date: string;
  duration: number; // Duration in minutes
}

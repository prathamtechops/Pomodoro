"use server";
import Session, { ISession } from "@/database/studySession.model";
import User from "@/database/user.model";
import { connectToDatabase } from "../moongose";
import {
  GetDurationByDateParams,
  StudyDuration,
  UpdateStudyTimeParams,
} from "./shared.types";

export async function updateStudyTime(params: UpdateStudyTimeParams) {
  try {
    await connectToDatabase();
    const { userId, studyTime, repetitions } = params;

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const lastSession = await Session.findOne({ userId }).sort({
      createdAt: -1,
    });

    if (
      lastSession &&
      new Date(lastSession.createdAt).toDateString() ===
        new Date().toDateString()
    ) {
      lastSession.duration = studyTime;
      lastSession.repetition = repetitions;
      await lastSession.save();
    } else {
      const newSession = await Session.create({
        userId,
        duration: studyTime,
        repetition: repetitions,
      });
      user.studySessions.push(newSession._id);
      await user.save();
    }
  } catch (e) {
    console.error(e);
  }
}

export async function getTodayStudySessions({ userId }: { userId: any }) {
  try {
    await connectToDatabase();
    const sessions: ISession = await Session.findOne({ userId }).sort({
      createdAt: -1,
    });

    if (
      sessions &&
      new Date(sessions.createdAt).toDateString() === new Date().toDateString()
    ) {
      return sessions;
    } else {
      return {
        duration: 0,
        repetition: 0,
      };
    }
  } catch (e) {
    console.error(e);
  }
}

export async function getDurationByDate(params: GetDurationByDateParams) {
  try {
    await connectToDatabase();
    const { userId, startDate, endDate } = params;

    let dateFilters = {};

    if (startDate && endDate) {
      dateFilters = {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      };
    }

    const sessions = await Session.find({ userId, ...dateFilters });

    if (!sessions) {
      throw new Error("No sessions found");
    }

    const durationMap: Record<string, number> = {};

    sessions.forEach((session) => {
      const date = new Date(session.createdAt).toISOString().split("T")[0];

      if (!durationMap[date]) {
        durationMap[date] = 0;
      }

      durationMap[date] += session.duration;
    });

    const studyDurations: StudyDuration[] = Object.entries(durationMap).map(
      ([date, duration]) => ({
        date,
        duration,
      })
    );

    return studyDurations;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

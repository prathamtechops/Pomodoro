import { Document, Schema, model, models } from "mongoose";

export interface IStudySession extends Document {
  userId: {
    type: Schema.Types.ObjectId;
    ref: "User";
  };
  duration: {
    type: Number;
  };
  startTime: {
    type: Date;
  };
  endTime: {
    type: Date;
  };
}

const studySessionSchema = new Schema<IStudySession>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    duration: {
      type: Number,
    },
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const StudySession =
  models.StudySession ||
  model<IStudySession>("StudySession", studySessionSchema);

export default StudySession;

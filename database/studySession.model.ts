import { Document, Schema, model, models } from "mongoose";

export interface ISession extends Document {
  userId: Schema.Types.ObjectId;
  duration: number;
  repetition: number;
  createdAt: Date;
}

const SessionSchema = new Schema<ISession>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    repetition: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Session = models.Session || model<ISession>("Session", SessionSchema);

export default Session;

import { Document, Schema, model, models } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  username: string;
  email: string;
  password?: string;
  studySessions: Schema.Types.ObjectId[];
  totalStudyTime: number;
}

const UserSchema = new Schema<IUser>(
  {
    clerkId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    studySessions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Session",
      },
    ],
    totalStudyTime: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model<IUser>("User", UserSchema);

export default User;

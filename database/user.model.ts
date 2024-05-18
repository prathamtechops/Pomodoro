import { Document, Schema, model, models } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  username: string;
  email: string;
  password?: string;
  studySessions: [
    {
      type: Schema.Types.ObjectId;
      ref: "StudySession";
    },
  ];
}

const userSchema = new Schema<IUser>(
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
        ref: "StudySession",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = models.User || model<IUser>("User", userSchema);

export default User;

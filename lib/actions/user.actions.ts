"use server";

import User, { IUser } from "@/database/user.model";
import { connectToDatabase } from "../moongose";
import { CreateUserParams, GetUser } from "./shared.types";

export async function getUserById(params: GetUser) {
  try {
    await connectToDatabase();
    const { clerkId } = params;
    const user: IUser | null = await User.findOne({ clerkId });
    return user;
  } catch (e) {
    console.error(e);
  }
}

export async function createUser(params: CreateUserParams) {
  try {
    await connectToDatabase();
    const newUser = await User.create(params);
    return newUser;
  } catch (e) {
    console.error(e);
  }
}

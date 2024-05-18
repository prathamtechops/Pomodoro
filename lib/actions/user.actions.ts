import User from "@/database/user.model";
import { connectToDatabase } from "../moongose";
import { CreateUserParams, GetUser } from "./shared.types";

export async function getUserById(params: GetUser) {
  try {
    connectToDatabase();
    const { clerkId } = params;
    const user = await User.findOne({ clerkId });
    return user;
  } catch (e) {
    console.log(e);
  }
}

export async function createUser(params: CreateUserParams) {
  try {
    connectToDatabase();

    const newUser = await User.create(params);

    return newUser;
  } catch (e) {
    console.log(e);
  }
}

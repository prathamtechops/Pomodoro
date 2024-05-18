export interface GetUser {
  clerkId: string;
}

export interface CreateUserParams {
  clerkId: string;
  username: string;
  email: string;
  picture: string;
}

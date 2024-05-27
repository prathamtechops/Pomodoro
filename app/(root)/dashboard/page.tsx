import { Chart } from "@/components/Chart";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await getUserById({ clerkId: userId });

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <main className="flex size-full flex-col gap-8 p-6 md:p-10">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-3xl font-bold">Study Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Stay organized and on top of your studies.
        </p>
      </div>
      <div className="flex size-full  items-center justify-center gap-4 ">
        <div className=" size-[400px] md:h-[300px] md:w-[600px] ">
          <Chart userId={JSON.parse(JSON.stringify(user._id))} />
        </div>
      </div>
    </main>
  );
}

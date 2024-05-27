import Duration from "@/components/Duration";
import PomodoroTimer from "@/components/PomodoroTimer";
import { getTodayStudySessions } from "@/lib/actions/study.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await getUserById({ clerkId: userId });

  if (!user) {
    redirect("/sign-in");
  }

  const sessions = await getTodayStudySessions({ userId: user._id });

  return (
    <main>
      <Duration />

      <PomodoroTimer
        studyTime={
          searchParams.studyTime ? parseInt(searchParams.studyTime) : 25
        }
        breakTime={
          searchParams.breakTime ? parseInt(searchParams.breakTime) : 5
        }
        userId={JSON.parse(JSON.stringify(user._id))}
        duration={sessions?.duration || 0}
        repetitions={sessions?.repetition || 0}
      />
    </main>
  );
}

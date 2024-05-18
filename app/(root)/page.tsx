import Duration from "@/components/Duration";
import PomodoroTimer from "@/components/PomodoroTimer";

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
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
      />
    </main>
  );
}

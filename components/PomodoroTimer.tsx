"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const PomodoroTimer = ({
  studyTime,
  breakTime,
}: {
  studyTime: number;
  breakTime: number;
}) => {
  const [secondsLeft, setSecondsLeft] = useState(studyTime * 60);
  const [isStudyTime, setIsStudyTime] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [repetition, setRepetition] = useState(0);

  useEffect(() => {
    setSecondsLeft(studyTime * 60);
    setIsStudyTime(true);
    if (repetition > 0) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [studyTime, breakTime, repetition]); // Include repetition in the dependency array

  useEffect(() => {
    let interval: any = null;

    if (isActive) {
      interval = setInterval(() => {
        setSecondsLeft((secondsLeft) => secondsLeft - 1);
        if (secondsLeft === 0) {
          setIsStudyTime(!isStudyTime); // Switch between study and break time
          setSecondsLeft((isStudyTime ? breakTime : studyTime) * 60);
          if (!isStudyTime) {
            setRepetition(repetition + 1); // Increment repetition when switching to break time
          }
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, secondsLeft, isStudyTime, studyTime, breakTime, repetition]); // Include repetition in the dependency array

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <>
      <div className="my-4 w-full max-w-sm rounded-lg border border-gray-200  p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
        <h5 className="mb-2 text-3xl font-bold tracking-tight ">
          {isStudyTime ? "Study Time" : "Break Time"}
        </h5>
        <p className="mb-5 font-mono text-5xl  ">{formatTime(secondsLeft)}</p>
        <Button className="w-full" onClick={toggleTimer}>
          {isActive ? "Pause" : "Start"}
        </Button>
      </div>

      <span className="text-sm font-bold">Repetition: {repetition}</span>
    </>
  );
};

export default PomodoroTimer;

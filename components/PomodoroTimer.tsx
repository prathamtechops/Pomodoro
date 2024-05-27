"use client";

import { updateStudyTime } from "@/lib/actions/study.actions";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const PomodoroTimer = ({
  studyTime,
  breakTime,
  userId,
  duration,
  repetitions,
}: {
  studyTime: number;
  breakTime: number;
  userId: string;
  duration: number;
  repetitions: number;
}) => {
  const [secondsLeft, setSecondsLeft] = useState(studyTime * 60);
  const [isStudyTime, setIsStudyTime] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [repetition, setRepetition] = useState(repetitions || 0);
  const [totalStudyTime, setTotalStudyTime] = useState(duration * 60 || 0);

  useEffect(() => {
    setSecondsLeft(studyTime * 60);
    setIsStudyTime(true);
    if (repetition > 0) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [studyTime, breakTime, repetition]);

  useEffect(() => {
    let interval: any = null;

    if (isActive) {
      interval = setInterval(() => {
        setSecondsLeft((prevSecondsLeft) => {
          if (prevSecondsLeft > 0) {
            return prevSecondsLeft - 1;
          } else {
            setIsStudyTime((prevIsStudyTime) => !prevIsStudyTime);
            if (!isStudyTime) {
              setRepetition((prevRepetition) => prevRepetition + 1); // Increment repetition when switching to break time
            }
            return (isStudyTime ? breakTime : studyTime) * 60;
          }
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, isStudyTime, studyTime, breakTime]);

  useEffect(() => {
    const studyTimeInterval = setInterval(() => {
      if (isActive && isStudyTime) {
        setTotalStudyTime((prevTotal) => prevTotal + 1);
      }
    }, 1000);

    return () => clearInterval(studyTimeInterval);
  }, [isActive, isStudyTime]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const endSession = async () => {
    console.log(
      `Total study time: ${Math.floor(totalStudyTime / 60)} minutes and ${
        totalStudyTime % 60
      } seconds`
    );
    setIsActive(false);

    try {
      await updateStudyTime({
        userId,
        studyTime: Math.floor(totalStudyTime / 60),
        repetitions: repetition,
      });
    } catch (error) {
      console.log("Error updating study time");
    }
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
        <Button className="mt-2 w-full" onClick={endSession}>
          End Session
        </Button>
      </div>

      <span className="text-sm font-bold">Repetition: {repetition}</span>
      <span className="ml-4 text-sm font-bold">
        Total Study Time: {Math.floor(totalStudyTime / 60)}:
        {totalStudyTime % 60 < 10 ? "0" : ""}
        {totalStudyTime % 60}
      </span>
    </>
  );
};

export default PomodoroTimer;

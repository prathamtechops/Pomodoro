"use client";
import { StudyDuration } from "@/lib/actions/shared.types";
import { getDurationByDate } from "@/lib/actions/study.actions";

import { ReloadIcon } from "@radix-ui/react-icons";
import { Schema } from "mongoose";
import { useTheme } from "next-themes";
import React from "react";
import { DateRange } from "react-day-picker";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DatePickerWithRange } from "./DatePicker";

export const Chart = ({ userId }: { userId: Schema.Types.ObjectId }) => {
  const [graphData, setGraphData] = React.useState<StudyDuration[] | undefined>(
    []
  );

  const { theme } = useTheme();

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const getGraphData = async () => {
      setLoading(true);
      try {
        const data = await getDurationByDate({
          userId,
          startDate: date?.from,
          endDate: date?.to,
        });
        setGraphData(data);
      } catch (error) {
        console.log(error);
        setGraphData([]);
      } finally {
        setLoading(false);
      }
    };
    getGraphData();
  }, [date, userId, date?.to, date?.from]);

  if (loading)
    return (
      <div className="flex size-full items-center justify-center">
        <div className="flex flex-col items-center px-5">
          <ReloadIcon className="my-2 size-10 animate-spin text-foreground " />
          <p className="text-sm">Getting your study data</p>
        </div>
      </div>
    );

  return (
    <>
      <DatePickerWithRange date={date} setDate={setDate} />
      <div className="size-full rounded-lg bg-background p-6 shadow-lg">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={700}
            data={graphData}
            margin={{
              top: 10,
              right: 30,
              left: -10,
              bottom: 0,
            }}
          >
            <XAxis
              dataKey="date"
              stroke={theme === "light" ? "#000000" : "#cbd5e1"}
            />
            <YAxis stroke={theme === "light" ? "#000000" : "#cbd5e1"} />
            <Tooltip content={<CustomTooltip />} />

            <Legend iconType="circle" />

            <Bar
              type="monotone"
              dataKey="duration"
              stroke={theme === "light" ? "#475569" : "#334155"}
              fill={theme === "light" ? "#475569" : "#334155"}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active) {
    return (
      <div className="rounded-lg bg-background p-2">
        <p className="space-x-1 text-xs">
          <span className="mr-1 font-bold">Date: </span> {`${label}`}
        </p>
        <p className="text-xs">
          <span className="mr-1 font-bold">Duration: </span>
          {`${payload[0]?.value} min`}
        </p>
      </div>
    );
  }

  return null;
};

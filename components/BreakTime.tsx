"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { breakTimers } from "@/constants";
import { updateQueryParams } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const BreakTime = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const breakTime = searchParams.get("breakTime");

  const handleStudyTime = (breakTime: string) => {
    const url = updateQueryParams(
      pathname,
      breakTime,
      "breakTime",
      searchParams
    );

    router.push(url);
  };

  return (
    <div>
      <p className="mb-2 text-sm font-medium">Break Time</p>
      <Select
        onValueChange={(value) => {
          handleStudyTime(value);
        }}
        defaultValue={breakTime || "5"}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Break Time" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Break Timers</SelectLabel>

            {breakTimers.map((timer) => (
              <SelectItem key={timer} value={timer.toString()}>
                {timer}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

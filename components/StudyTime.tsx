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
import { studyTimers } from "@/constants";
import { updateQueryParams } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const StudyTime = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const studyTime = searchParams.get("studyTime");

  const handleStudyTime = (studyTime: string) => {
    const url = updateQueryParams(
      pathname,
      studyTime,
      "studyTime",
      searchParams
    );

    router.push(url);
  };

  return (
    <div>
      <p className="mb-2 text-sm font-medium">Study Time</p>
      <Select
        onValueChange={(value) => {
          handleStudyTime(value);
        }}
        defaultValue={studyTime || "25"}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Study Time" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Study Timers</SelectLabel>
            {/* <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem> */}
            {studyTimers.map((timer) => (
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

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
import { updateQueryParams } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  filter: "studyTime" | "breakTime" | "daily" | "weekly" | "monthly";
  options: number[];
  title: string;
  defaultValue: string;
}

export const Filter = ({ filter, options, title, defaultValue }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const filterValue = searchParams.get(filter);

  const handleStudyTime = (value: string) => {
    const url = updateQueryParams(pathname, value, filter, searchParams);

    router.push(url);
  };

  return (
    <div>
      <p className="mb-2 text-sm font-medium">Break Time</p>
      <Select
        onValueChange={(value) => {
          handleStudyTime(value);
        }}
        defaultValue={filterValue || defaultValue}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={`Select ${title}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{title}</SelectLabel>

            {options.map((timer) => (
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

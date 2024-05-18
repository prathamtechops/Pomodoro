import { breakTimers, studyTimers } from "@/constants";
import { Filter } from "./Filter";

function Duration() {
  return (
    <div className="flex gap-4">
      <Filter
        filter="studyTime"
        options={studyTimers}
        title="Study Time"
        defaultValue="25"
      />

      <Filter
        filter="breakTime"
        options={breakTimers}
        title="Break Time"
        defaultValue="5"
      />
    </div>
  );
}

export default Duration;

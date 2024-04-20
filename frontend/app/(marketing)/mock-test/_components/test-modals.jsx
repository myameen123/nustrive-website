import React from "react";
import TestModal from "./test-modal";
const TEST = [
  {
    id: "1",
    subjects: [
      "Chemistry",
      "Mathematics",
      "Physics",
      "English",
      "Intelligence Question",
    ],
    type: "Engineering",
    url: "/mock-test/engineering-test/instructions",
  },
  {
    id: "2",
    subjects: ["Mathematics", "English", "Intelligence Question"],
    type: "Business Studies / Social Sciences / LLB:",
    url: "/mock-test/business-test/instructions",
  },
];
function TestModals() {
  return (
    <div className=" mt-4 sm:p-8 p-4 md:w-[80%] mx-auto flex flex-col gap-8 ">
      {TEST.map((t) => (
        <TestModal test={t} key={t.id} />
      ))}
    </div>
  );
}

export default TestModals;

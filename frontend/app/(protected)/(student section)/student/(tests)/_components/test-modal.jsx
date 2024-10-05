import { Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

function TestModal({ test }) {
  const subjects = test.subjects.join(", ");
  return (
    <div className=" border shadow-lg">
      <div className=" bg-[#111225] text-white p-2 ">
        <Typography>
          {`Online Test for NET ( Nust Entrance Test) Preparation - ${test.type}`}
        </Typography>
      </div>
      <div className=" flex flex-col p-4 gap-1">
        <Typography variant="h7" className=" font-bold">
          Subjects included:
        </Typography>
        <Typography> {subjects}</Typography>
        <div className=" flex flex-wrap gap-3 text-sm">
          <span>
            Total Marks: <span className=" font-bold">200</span>
          </span>
          <span>
            Marks/Question: <span className=" font-bold">1</span>
          </span>
          <span>
            Negative Marking: <span className=" font-bold">No</span>
          </span>
          <span>
            Type: <span className=" font-bold">Free</span>
          </span>
          <Link
            href={test.url}
            className=" bg-[#49ADE5] px-4 py-1 font-bold rounded-md"
          >
            Start
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TestModal;

import React from "react";

import { Typography } from "@mui/material";

function TestOverview() {
  return (
    <div className="relative bg-cover bg-center bg-[url('/testBg.jpg')]">
      <div className=" static top-0 left-0 w-full h-full flex items-center justify-center bg-[#49ADE5]/80">
        <div className="text-white   w-[90%] h-full p-8">
          <div className=" text-center mb-4">
            <Typography variant="h4">
              NET ( NUST ENTRANCE TEST) PREPARE YOURSELF FOR NET.
            </Typography>

            {/* <Typography variant="p">
              Try our free tests, mock test&apos;s are only for register
              user&apos;s and will only be visible to register user&apos;s.
            </Typography> */}
          </div>
          <div className=" text-left">
            <Typography variant="h5">A brief Summary:</Typography>
            <br />
            <Typography>
              National University of Science and Technology (NUST) is a leading
              universities in Pakistan. Candidates must clear the entry test
              called Nust Entry Test – NET – to get admission into the
              university.
            </Typography>
            <br />
            <Typography>
              NUST entry test format depends on the coursework that you are
              applying for. Format for each of the coursework is given below,
            </Typography>
            <br />
            <Typography variant="h6">
              Engineering / Computer Science:
            </Typography>
            <ul className=" ml-8 list-disc">
              <li>Mathemetics: 40% (80 mcqs)</li>
              <li>Physics: 30% (60 mcqs)</li>
              <li>Chemistry: 15% (30 mcqs)</li>
              <li>English: 10% (20 mcqs)</li>
              <li>Intelligence: 5% (10 mcqs)</li>
            </ul>
            <br />
            <Typography variant="h6">
              Business Studies / Social Sciences / LLB:
            </Typography>
            <ul className=" ml-8 list-disc">
              <li>Mathemetics: 40% (80 mcqs)</li>
              <li>English: 40% (80 mcqs)</li>
              <li>Intelligence: 20% (40 mcqs)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestOverview;

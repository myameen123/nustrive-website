"use client";
import { Button } from "@/components/ui/button";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";

function InstructionModal({ type }) {
  const [isChecked, setIsChecked] = useState(false);

  const onCheckHandler = (e) => {
    setIsChecked(!isChecked);
  };
  return (
    <div className=" border shadow-xl  md:w-[80%] rounded-md mx-auto p-4 my-4">
      <p className=" p-2 border-b">
        Online Test for NET ( Nust Entrance Test) Preparation.
      </p>
      <Box marginTop={2}>
        <Typography variant="h5">General Instruction:</Typography>
        <p>Please read the following instructions very carefully:</p>
        <br />
        <ul className=" list-disc ml-4 space-y-1">
          <li>
            <p>
              Important: These Tests are only for practices purpose is not
              correlated with any organization, all information given is
              collected from various online sources, with the motive to help
              students to prepare themselves for various exams. Verified
              information is available on the website concerned.
            </p>
          </li>
          <li>
            <p>
              You have <b>180 minutes</b> to complete the test.
            </p>
          </li>
          <li>
            <p>
              The test contains a total of <b>200 questions</b>.
            </p>
          </li>
          <li>
            <p>
              There is only one correct answer to each question. Click on the
              most appropriate option to mark it as your answer.
            </p>
          </li>
          <li>
            <p>
              You will be awarded <b>1 mark </b> for each correct answer.
            </p>
          </li>
          <li>
            <p>
              You can move back and forth between the questions by clicking the
              buttons &quot;Previous&quot; and &quot;Next&quot; respectively.
            </p>
          </li>
          <li>
            <p>
              A Number list of Unattempted questions appears at the Left hand
              side of the screen. You can access the questions in any order
              within a section or across sections by clicking on the question
              number given on the number list.
            </p>
          </li>
          <li>
            <p>
              You can use rough sheets while taking the test. Do not use
              calculators, log tables, dictionaries, or any other printed/online
              reference material during the test
            </p>
          </li>
          <li>
            <p>
              Do not click the button &quot;End test&quot; before completing the
              test. A test once submitted cannot be resumed.
            </p>
          </li>
        </ul>
      </Box>
      <div className=" border-t mt-4 p-4">
        <div className=" p-2 bg-gray-300 md:flex-row flex-col py-4 flex gap-2 items-center ">
          <div className=" flex gap-2">
            <input
              type="checkbox"
              id="check"
              className=" cursor-pointer"
              checked={isChecked}
              onChange={onCheckHandler}
            />
            <label
              htmlFor="check"
              className=" text-red-500 text-sm cursor-pointer"
            >
              I have read and understood the instructions. I agree that in case
              of not adhering to the exam instructions.
            </label>
          </div>
          {type == "enginerring" ? (
            <Button
              disabled={!isChecked}
              className=" bg-[#49ADE5] hover:bg-[#49ADE5]"
            >
              <Link href="/mock-test/engineering-test/start">Start Test</Link>
            </Button>
          ) : (
            <Button
              disabled={!isChecked}
              className=" bg-[#49ADE5] hover:bg-[#49ADE5]"
            >
              <Link href="/mock-test/business-test/start">Start Test</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default InstructionModal;

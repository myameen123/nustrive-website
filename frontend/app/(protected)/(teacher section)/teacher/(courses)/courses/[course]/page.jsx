"use client";
import React from "react";
// import WeekCard from '../../_components/weekCard'
import WeekList from "../../_components/weekList";
import { useParams } from "next/navigation";

const CoursePage = () => {
  const params = useParams();
  // console.log("params in :", params.course);
  const course = params.course;

  return (
    <div>
      <WeekList course={course} />
    </div>
  );
};

export default CoursePage;

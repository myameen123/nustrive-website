"use client";
import React, { useState, useEffect } from "react";
import CourseCard from "../_components/courseCard";
import Link from "next/link";
import axios from "axios";

const CourseListPage = () => {
  const [courses, setCourses] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/get`
      );
      console.log("response: ", response);
      setCourses(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {courses &&
        courses.map((course) => (
          <Link key={course._id} href={`courses/${course._id}`}>
            {/* {console.log('course._id',course._id)} */}
            <CourseCard course={course} />
          </Link>
        ))}
    </div>
  );
};

export default CourseListPage;

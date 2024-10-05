'use client'
import React,{useState, useEffect} from "react";
// import { courses } from "../_components/Courses";
import CourseCard from "../_components/courseCard";
import Link from "next/link";
import axios from "axios";


const CourseListPage = () => {
  const [courses, setCourses] = useState(null)

  useEffect(()=>{
    fetchCourses()
  },[])

  const fetchCourses = async () =>{
    try{
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/course/get`)
      console.log('response: ', response)
      setCourses(response.data)
      
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div>
      CourseListPage
      {courses &&
      courses.map((course) => (
        <Link key={course.id} href={`courses/${course.id}`}>
          <CourseCard course={course} />
        </Link>
      ))
      }
    </div>
  );
};

export default CourseListPage;

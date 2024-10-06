import React from "react";

const CourseCard = ({ course }) => {
  console.log("course", course);
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-4">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">{course.name}</h1>
        <p className="text-gray-600">{course.description}</p>
      </div>
    </div>
  );
};

export default CourseCard;

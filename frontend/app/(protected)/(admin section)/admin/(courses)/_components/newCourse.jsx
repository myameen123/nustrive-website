import React from "react";
import CourseForm from "./courseForm";

const NewCourse = ({ edit, closeModal, handleAdd, fetchCourses}) => {
  return (
    <div>
      <CourseForm
        handleSubmit={handleAdd}
        edit={edit}
        closeModal={closeModal}
        fetchCourses={fetchCourses}
        course={{name:'',description:'',category:'',teacher:''}}
      />
    </div>
  );
};

export default NewCourse;

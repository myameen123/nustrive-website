import React from "react";
import CourseForm from "./courseForm";
import axios from "axios";
import toast from "react-hot-toast";

const EditCourse = ({edit, closeModal, course,fetchCourses }) => {
  let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/update/${course._id}`

  const handleSubmit = async (data) => {
    try {
      const response = await axios.put(url,data);
      if (response) {        
        closeModal();
        fetchCourses()
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div>
      <CourseForm
        handleSubmit={handleSubmit}
        edit={edit}
        closeModal={closeModal}
        course={course}
      />
    </div>
  );
};

export default EditCourse;

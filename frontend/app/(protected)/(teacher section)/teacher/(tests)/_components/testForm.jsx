"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const TestForm = ({ edit, closeModal, handleSubmit, test, courses }) => {
  const [state, setState] = useState({
    title: "",
    subject: "",
    category: "",
    description: "",
  });
  // const [courses, setCourses] = useState([]);

  useEffect(() => {
    // fetchCourses();
    setState({
      title: test.title || "",
      subject: test.subject || "",
      category: test.category || "",
      description: test.description || "",
    });
  }, [test]);

  // const fetchCourses = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/get`
  //     );
  //     console.log("response in testform: ", response);
  //     setCourses(response.data);
  //     console.log("courses in testform", courses);
  //   } catch (err) {
  //     console.log("err.message", err.message);
  //   }
  // };

  const onSubmit = async (e) => {
    e.preventDefault();

    handleSubmit(state);
    closeModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="">
      <h2 className="text-xl font-bold mb-4">
        {edit ? "Edit Test" : "Add New Test"}
      </h2>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={state.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="subject" className="block text-gray-700">
            Select Subject
          </label>
          <select
            type="text"
            name="subject"
            id="subject"
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={state.subject}
            onChange={handleChange}
            required
          >
            <option value=""></option>
            {courses && courses.length > 0 ? (
              courses.map((course) => (
                
                <option key={course._id} value={course._id}>
                  {course.name}
                </option>
              ))
            ) : (
              <option value="">No course found</option>
            )}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700">
            Select Category
          </label>
          <select
            type="text"
            name="category"
            id="category"
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={state.category}
            onChange={handleChange}
            required
          >
            <option value=""></option>
            <option value="engineering">Engineering</option>
            <option value="business">Business</option>
            <option value="medical">Medical</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={state.description}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="mr-2 p-2 bg-gray-400 text-white rounded"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button type="submit" className="p-2 bg-blue-600 text-white rounded">
            {edit ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TestForm;

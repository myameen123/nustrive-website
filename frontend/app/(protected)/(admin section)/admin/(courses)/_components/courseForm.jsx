"use client";
import React, { useState, useEffect } from "react";

const CourseForm = ({ edit, closeModal, handleSubmit, course }) => {
  const [state, setState] = useState({
    name: "",
    description: "",
    category: "",
    teacher: "",
  });

  useEffect(() => {
    setState({
      name: course.name || "",
      description: course.description || "",
    });
  }, [course]);

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
    <div>
      <h2 className="text-xl font-bold mb-4">
        {edit ? "Edit Test" : "Add New Test"}
      </h2>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">
            Name
          </label>
          <input
            name="name"
            className="w-full p-2 border border-gray-300 rounded mt-2"
            type="text"
            placeholder="Enter Course name"
            value={state.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">
            {" "}
            Description
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-2"
            name="description"
            placeholder="Enter Description"
            value={state.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700">
           Select Category
          </label>
          <select name="category" id="category"
                      className="w-full p-2 border border-gray-300 rounded mt-2"
                      value={state.category}
                      onChange={handleChange}
                      required
          >
            <option value=''></option>
            <option value="engineering">Engineering</option>
            <option value="business">Business</option>
            <option value="medical">Medical</option>
          </select>
          {/* <input
            name="category"
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-2"
            placeholder="Enter Category"
            value={state.category}
            onChange={handleChange}
            required
          /> */}
        </div>
        <div className="mb-4">
          <label htmlFor="teacher" className="block text-gray-700">
            Teacher
          </label>
          <input
            name="teacher"
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-2"
            placeholder="Select Teacher"
            value={state.teacher}
            onChange={handleChange}
            required
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

export default CourseForm;

"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

const TestForm = ({ edit, closeModal, handleSubmit, test }) => {
const params = useParams();
console.log('params in testform: ', params);
const courseId = params.course;
const week = params.week;
const [course, setCourse] = useState({name:'',course:'',category:'',description:''});
  const [state, setState] = useState({
    title: "",
    course: courseId,
    week:week,
    category: course.category,
    description: "",
  });

  useEffect(()=>{
      fetchCourse(courseId)
  },[courseId])

  useEffect(() => {

    setState({
      title: test.title || "",
      course: courseId || '',
      week:week || '',
      category: course.category || '',
      description: test.description || "",
    });
  }, [test,week, course]);


  const fetchCourse = async (courseId)=>{
    try{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/course/get/${courseId}`)
        setCourse(response.data)
    }catch(err){
        console.log('err.message in testform: ', err.message)
    }
  }

  console.log('course : ', course) 

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('state is ', state)
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
        {/* <div className="mb-4">
          <label htmlFor="subject" className="block text-gray-700">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            id="subject"
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={state.subject}
            onChange={handleChange}
            placeholder={course.name}
            required
            disabled
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700">
            Category
          </label>
          <input
            type="text"
            name="category"
            id="category"
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={state.category}
            onChange={handleChange}
            placeholder={course.category}
            disabled
            required
          />
        </div> */}
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

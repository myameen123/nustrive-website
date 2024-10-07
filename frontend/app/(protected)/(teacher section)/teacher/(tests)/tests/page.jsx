"use client";
import React, { useEffect, useState } from "react";
import TestCard from "../_components/testCard";
import ModalLayout from "../../../../../../components/modals/ModalLayout/modal-layout";
import EditTest from "../_components/editTest";
import NewTest from "../_components/newTest";
import axios from "axios";

const TestList = () => {
  const [tests, setTests] = useState([]);
  const [courses, setCourses] = useState([])
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [currentTest, setCurrentTest] = useState({title:'', description:''});

  useEffect(()=>{
    fetchCourses()
  },[])

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchCourses = async () => {
    try{
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/course/get`)
       console.log('response in testlist: ', response.data)
       setCourses(response.data)
       console.log('courses in testlist',courses)
    }catch(err){
      console.log('err.message',err.message)
    }
  }

  const fetchTests = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/test/get`
      );
      const data = await response.json();
      setTests(data);
    } catch (err) {
      console.error("Error fetching tests:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/test/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      setTests(tests.filter((test) => test._id !== id));
    } catch (err) {
      console.error("Error deleting test:", err);
    }
  };

  const handleAdd = async (test) => {
    try {
      setEdit(false)
      console.log('test in handleAdd',test)
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/test/add`,test);
      const newTest = await response.data;
      fetchTests();
    } catch (err) {
      console.error("Error adding test:", err);
    }
  };

 
  const handleEdit =  (test) => {
    try {
      setEdit(true);
      setCurrentTest(test)
      openModal()
    } catch (err) {
      console.error("Error updating test:", err);
    }
  };

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setEdit(false)
  };

  return (
    <>
      {/* <div className="flex justify-end">
        <button
          className="p-2 w-fit text-white rounded-[5px] transition-all my-4 bg-[#4463FB] hover:bg-[#4463FB]/90"
          onClick={openModal}
        >
          Add Test
        </button>
      </div> */}
      <div>
        {tests &&
        tests.map((test) => (
          <TestCard
            setEdit={setEdit}
            key={test._id}
            test={test}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
      {modal && (
        <ModalLayout open={true} onClose={closeModal}>
          {edit ? (
            <EditTest
              edit={edit}
              closeModal={closeModal}
              test={currentTest}
              setCurrentTest={setCurrentTest}
              handleEdit={handleEdit}
              setTests={setTests}
              fetchTests={fetchTests}
              courses={courses}
            />
          ) : (
            <NewTest
              edit={edit}
              closeModal={closeModal}
              fetchTests={fetchTests}
              handleAdd={handleAdd}
              test={currentTest}
              courses={courses}
            />
          )}
        </ModalLayout>
      )}
    </>
  );
};

export default TestList;

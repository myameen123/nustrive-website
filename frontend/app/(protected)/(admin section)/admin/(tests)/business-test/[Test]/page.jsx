"use client";
import React, { useEffect, useState } from "react";
import QuestionCard from "../../_components/questionCard";
import { useParams } from "next/navigation";
import ModalLayout from "@/components/modals/ModalLayout/modal-layout";
import NewQuestion from "../../_components/newQuestion";
import EditQuestion from "../../_components/editQuestion";
import toast from "react-hot-toast";
import axios from "axios";

const TestPage = () => {
  const params = useParams();
  const [questions, setQuestions] = useState([]);
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/question/business/get/${params.Test}`
      );
      const data = await response.data;
      setQuestions(data);
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

  const handleAdd = async (question) => {
    try {
      const data = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/question/business/add`,
        question,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (data) {
        console.log("data: ", data);
        fetchQuestions();
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

  const handleDelete = async (id) => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/question/business/delete/${id}`,
        { method: "DELETE" }
      );
      setQuestions(questions.filter((question) => question._id !== id));
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

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setEdit(false);
    setModal(false);
  };

  const handleEdit = (question) => {
    try {
      setEdit(true);
      openModal();
      setCurrentQuestion(question);
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
    <>
      <div className="flex justify-end">
        <button
          className="p-2 w-fit text-white rounded-[5px] transition-all my-4 bg-[#4463FB] hover:bg-[#4463FB]/90"
          onClick={openModal}
        >
          Add New Question
        </button>
      </div>
      <div>
        <h1 className="p-4 text-2xl">Business Questions</h1>
        {questions.map((question) => (
          <QuestionCard
            key={question._id}
            setEdit={setEdit}
            question={question}
            onDelete={handleDelete}
            onEdit={handleEdit}
            field={'business'}
          />
        ))}
      </div>
      {modal && (
        <ModalLayout open={true} onClose={closeModal}>
          {edit ? (
            <EditQuestion
              field={'business'}
              edit={edit}
              fetchQuestions={fetchQuestions}
              closeModal={closeModal}
              question={currentQuestion}
              handleEdit={handleEdit}
            />
          ) : (
            <NewQuestion
              edit={edit}
              closeModal={closeModal}
              handleAdd={handleAdd}
              fetchQuestions={fetchQuestions}
            />
          )}
        </ModalLayout>
      )}
    </>
  );
};

export default TestPage;

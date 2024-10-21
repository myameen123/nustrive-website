"use client";
import React, { useEffect, useState } from "react";
import QuestionCard from "../../_components/questionCard";
import { useParams } from "next/navigation";
import ModalLayout from "../../../../../../../components/modals/ModalLayout/modal-layout";
import NewQuestion from "../../_components/newQuestion";
import EditQuestion from "../../_components/editQuestion";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "../../../../../../../components/modals/loader";

const TestPage = () => {
  const { test: testId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  // console.log("testId", testId);

  useEffect(() => {
      fetchQuestions();
    // }
  }, []);

  const toastConfig = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/mock-question/getTest/${testId}`
      );
      // console.log("response.data", response.data);
      setQuestions(response.data.questions);
    } catch (error) {
      toast.error(error.message, toastConfig);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (question) => {
    try {
      // console.log("question handleAdd [test]", question);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/mock-question/add`,
        question,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response) fetchQuestions(testId);
    } catch (error) {
      toast.error(error.message, toastConfig);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/mock-question/delete/${id}`,
        { method: "DELETE" }
      );

      setQuestions((prevQuestions) =>
        prevQuestions.filter((question) => question._id !== id)
      ); //(prevQuestions) => prevQuestions.filter((question) => question._id !== id)
    } catch (error) {
      toast.error(error.message, toastConfig);
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
      toast.error(error.message, toastConfig);
    }
  };

  // console.log("questions in [test]", questions);

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
        <h1 className="p-4 text-2xl">All Questions</h1>
        {loading ? (
          <Loader />
        ) : questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              key={question._id}
              setEdit={setEdit}
              question={question}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        ) : (
          <p>No questions available</p>
        )}
      </div>
      {modal && (
        <ModalLayout open={true} onClose={closeModal}>
          {edit ? (
            <EditQuestion
              field={"engineering"}
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

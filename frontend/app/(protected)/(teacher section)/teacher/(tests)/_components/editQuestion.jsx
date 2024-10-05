import React from "react";
import QuestionForm from "./QuestionForm";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

const EditQuestion = ({field, edit, closeModal, question, fetchQuestions, handleEdit}) => {
  const testId = useParams().Test;
  
  let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/question/engineering/update/${question._id}`;
  if(field!=='engineering'){
    url=`${process.env.NEXT_PUBLIC_BACKEND_URL}/question/business/update/${question._id}`
  }

  const handleSubmit = async (data) => {
    try {
      const response = await axios.put(url,
        data
      );
      if (response) {
        handleEdit()
        fetchQuestions()
        closeModal();
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
      <QuestionForm
      testId = {testId}
        question={question}
        edit={edit}
        fetchQuestions={fetchQuestions}
        closeModal={closeModal}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default EditQuestion;

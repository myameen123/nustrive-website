import React from "react";
import QuestionForm from "./QuestionForm";
import toast from "react-hot-toast";
import axios from "axios";

const EditQuestion = ({edit, closeModal, question, fetchQuestions, handleEdit}) => {
  // const questionId = question._id
  let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/mock-question/update/${question._id}`;
  // if(field!=='engineering'){
  //   url=`${process.env.NEXT_PUBLIC_BACKEND_URL}/question/business/update/${question._id}`
  // }

  const handleSubmit = async (data) => {
    try {
      // console.log('data in handleSubmit editQuestion',data)
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

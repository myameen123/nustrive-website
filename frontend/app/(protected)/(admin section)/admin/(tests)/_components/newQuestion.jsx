import React from "react";
import QuestionForm from "./QuestionForm";

const NewQuestion = ({ closeModal, edit, handleAdd, fetchQuestions }) => {

  return (
    <div>
      <QuestionForm
        closeModal={closeModal}
        edit={edit}
        handleSubmit={handleAdd}
        fetchQuestions={fetchQuestions}
        question={{
          text: "",
          options: ["", "", "", ""],
          subject: "",
        }}
      />
    </div>
  );
};

export default NewQuestion;

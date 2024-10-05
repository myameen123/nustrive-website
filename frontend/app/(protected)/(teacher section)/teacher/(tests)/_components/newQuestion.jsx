import React from "react";
import QuestionForm from "./QuestionForm";
import { useParams } from "next/navigation";

const NewQuestion = ({ closeModal, edit, handleAdd, fetchQuestions }) => {
  const testId = useParams().Test;

  return (
    <div>
      <QuestionForm
        testId={testId}
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

import React from "react";
import TestForm from "./testForm";

const NewTest = ({ edit, closeModal, handleAdd, fetchTests}) => {
  return (
    <div>
      <TestForm
        handleSubmit={handleAdd}
        edit={edit}
        closeModal={closeModal}
        fetchTests={fetchTests}
        test={{title:'',description:''}}
      />
    </div>
  );
};

export default NewTest;

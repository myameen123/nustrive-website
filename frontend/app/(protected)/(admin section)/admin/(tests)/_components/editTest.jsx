import React from "react";
import TestForm from "./testForm";
import axios from "axios";
import toast from "react-hot-toast";

const EditTest = ({ edit, closeModal, test,fetchTests }) => {
  const handleSubmit = async (data) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/test/engineering/updateTest/${test._id}`,
        data
      );
      if (response) {        
        closeModal();
        fetchTests()
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
      <TestForm
        handleSubmit={handleSubmit}
        edit={edit}
        closeModal={closeModal}
        test={test}
      />
    </div>
  );
};

export default EditTest;

import React from "react";
import TestForm from "./testForm";
import axios from "axios";
import toast from "react-hot-toast";

const EditTest = ({ edit, closeModal, content,fetchContent }) => { //fetchTests
  let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/test/update/${content._id}`

  const handleSubmit = async (data) => {
    try {
      const response = await axios.put(url,data);
      if (response) {        
        closeModal();
        fetchContent()
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
        test={content}
      />
    </div>
  );
};

export default EditTest;

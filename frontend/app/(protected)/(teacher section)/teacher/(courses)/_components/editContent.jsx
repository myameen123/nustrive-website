import React from "react";
import ContentForm from "./contentForm";
import axios from "axios";
import toast from "react-hot-toast";

const EditContent = ({ edit, closeModal, content, fetchContent }) => {
  let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/courseContent/get/${content._id}`;

  const handleSubmit = async (data) => {
    try {
      const response = await axios.put(url, data);
      if (response) {
        closeModal();
        fetchContent();
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
      <ContentForm
        handleSubmit={handleSubmit}
        edit={edit}
        closeModal={closeModal}
        course={course}
      />
    </div>
  );
};

export default EditContent;

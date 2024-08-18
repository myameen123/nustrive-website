import React from "react";
import RegisterForm from "./register-form";
import axios from "axios";

const EditUser = ({ user, edit, fetchUsers, closeModal }) => {
    const handleSubmit = async (data) => {
        try {
        const id =await user._id;
        // console.log("user._id", user._id);
      console.log("edit data: ", data);
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/update-user/${id}`,
        data,
        {
            headers: {
              'Content-Type': 'application/json',
            },
          }
      );
      if (!response.ok) {
        console.log("user not updated!");
      }
      fetchUsers();
      closeModal()
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <RegisterForm user={user} edit={edit} handleSubmit={handleSubmit} />
    </>
  );
};

export default EditUser;

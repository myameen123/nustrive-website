import React from "react";
import RegisterForm from "./register-form";
import axios from "axios";
// import { useSelector } from 'react-redux'

const RegisterUser = ({ edit, closeModal, fetchUsers }) => {
  // const {loading, success, error} = useSelector(state=>state.addNewUser);

  const handleSubmit = async (data) => {
    console.log("data: ", data);
    await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
      data,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    closeModal();
    fetchUsers();
  };

  return (
    <>
      <RegisterForm edit={edit} handleSubmit={handleSubmit} />
    </>
  );
};

export default RegisterUser;

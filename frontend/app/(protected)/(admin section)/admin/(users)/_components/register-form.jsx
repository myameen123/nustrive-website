"use client";
import CustomTextField from "@/components/inputs/TextField";
import React, { useEffect, useState } from "react";
import { RotateCw } from "lucide-react";

// import { useSelector } from "react-redux";
// import { Input } from "postcss";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";

const RegisterForm = ({ user, edit, handleSubmit }) => {
  console.log("user in register form", user);

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  //   const router = useRouter();
  const loading = false;
  // const { loading = false, error } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (user) {
      setState({
        name: user.name || "",
        email: user.email || "",
        password: user.password || "",
        role: user.role || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("state", state);
    handleSubmit(state);
  };

  return (
    <div className="flex flex-col justify-center p-4 items-center border w-full mx-auto shadow-[8px]">
      <h1 className="text-center font-bold text-2xl my-4">
        {" "}
        {edit ? "Edit User" : "Register User"}
      </h1>
      <form className="flex flex-col gap-4 w-full ">
        <div>
          <div>
            <div className="mb-2 block">
              <label htmlFor="name">Username</label>
            </div>
            <CustomTextField
              size="small"
              id="name"
              type="name"
              name="name"
              value={state.name}
              placeholder="Example"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-2 block">
            <label htmlFor="email">User Email</label>
          </div>
          <CustomTextField
            size="small"
            id="email"
            name="email"
            type="email"
            value={state.email}
            placeholder="example@gmail.com"
            onChange={handleChange}
            required
            disabled={edit}
          />
        </div>
        {/* {!edit && ( */}
        <div>
          <div className="mb-2 block">
            <label htmlFor="password">User Password</label>
          </div>
          <CustomTextField
            size="small"
            id="password"
            name="password"
            type="password"
            value={state.pasword}
            placeholder="Password"
            onChange={handleChange}
            required
          />
        </div>
        {/* )} */}
        <div>
          <div className="mb-2 block">
            <label htmlFor="role">User Role</label>
          </div>
          <CustomTextField
            size="small"
            name="role"
            id="role"
            type="role"
            value={state.role}
            placeholder="e.g: student"
            onChange={handleChange}
            required
          />
        </div>
        <button
          disable={loading.toString()}
          onClick={onSubmit}
          type="submit"
          className={`p-2 text-white rounded-[5px] transition-all my-4 bg-[#4463FB] hover:bg-[#4463FB]/90 ${
            loading ? "bg-slate-500 flex justify-center items-center" : ""
          }`}
        >
          {loading ? (
            <>
              <RotateCw className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : edit ? (
            <span>Update</span>
          ) : (
            <span>Register</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;

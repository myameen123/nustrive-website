"use client";
import CustomTextField from "@/components/inputs/TextField";
import { loginUser } from "@/redux/auth/login-slice";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RotateCw } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.userLogin
  );

  useEffect(() => {
    if (error?.status) {
      console.log(error.message);
      alert(error.message);
      window?.location.reload();
    }
    if (isAuthenticated) {
      router.push("/admin");
    }
  }, [dispatch, isAuthenticated, loading, error?.status]);

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("email password", email, password);
    dispatch(loginUser({ email, password }));
  };
  return (
    <div className="  flex flex-col justify-center p-4 items-center border md:w-1/2 w-full mx-auto shadow-[8px]">
      <h1 className=" text-center font-bold text-2xl my-4">Login</h1>
      <form className="flex  flex-col gap-4  w-full ">
        <div>
          <div className="mb-2 block">
            <label htmlFor="password1">Your Email</label>
          </div>
          <CustomTextField
            size="small"
            id="email1"
            type="email"
            placeholder=""
            onChange={onEmailChange}
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <label htmlFor="password1">Your Password</label>
          </div>
          <CustomTextField
            size="small"
            id="password1"
            type="password"
            onChange={onPasswordChange}
            required
          />
        </div>

        <button
          disable={loading}
          onClick={onSubmit}
          type="submit"
          className={`p-2 text-white rounded-[5px] transition-all my-4 bg-[#111256] hover:bg-[#111256]/90 ${
            loading ? "bg-slate-500 flex justify-center items-center" : ""
          }`}
        >
          {loading ? (
            <>
              <RotateCw className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            <span> Login</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;

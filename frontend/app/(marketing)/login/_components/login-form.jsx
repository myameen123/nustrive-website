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
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.userLogin
  );
  const [errorToastId, setErrorToastId] = useState(null);

  useEffect(() => {
    if (error) {
      console.log("login form error", error)
      toast.error(error.message);
      // setErrorToastId(id);
    }
    if (isAuthenticated) {
      if (user && user.role === "admin") {
        router.push("/admin");
      }
      if (user && user.role === "student") {
        router.push("/student");
      }
    }
  }, [error, isAuthenticated, user, router, errorToastId]);

  useEffect(() => {
    if (!error) {
      if (errorToastId) {
        toast.dismiss(errorToastId);
        setErrorToastId(null);
      }
    }
  }, [error, errorToastId]);

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="flex flex-col justify-center p-4 items-center border md:w-1/2 w-full mx-auto shadow-[8px]">
      <h1 className="text-center font-bold text-2xl my-4">Login</h1>
      <form className="flex flex-col gap-4 w-full ">
        <div>
          <div className="mb-2 block">
            <label htmlFor="email">Your Email</label>
          </div>
          <CustomTextField
            size="small"
            id="email"
            type="email"
            placeholder=""
            onChange={onEmailChange}
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <label htmlFor="password">Your Password</label>
          </div>
          <CustomTextField
            size="small"
            id="password"
            type="password"
            onChange={onPasswordChange}
            required
          />
        </div>
        <button
          disable={loading.toString()}
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
            <span>Login</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;

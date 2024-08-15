"use client";
// Add this logic where you handle logout in your component or saga
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, clearPersistedState } from "@/redux/auth/logout-slice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Logout = () => {
  const { user } = useSelector((state) => state.userLogin);
  const { error, loading } = useSelector((state) => state.logout);
  const [toastId, setToastId] = useState(null);
  const [errorToastId, setErrorToastId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loading) {
      if (!toastId) {
        const id = toast.loading("Logging out...");
        setToastId(id);
      }
    } else {
      if (toastId) {
        toast.dismiss(toastId);
        setToastId(null);
      }
      if (error && !errorToastId) {
        const id = toast.error(error);
        setErrorToastId(id);
      }
    }
  }, [loading, error, toastId, errorToastId]);

  useEffect(() => {
    if (!error) {
      if (errorToastId) {
        toast.dismiss(errorToastId);
        setErrorToastId(null);
      }
    }
  }, [error, errorToastId]);
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const resultAction = await dispatch(logoutUser(user?._id));
      const originalPromiseResult = unwrapResult(resultAction);
      // If the logout is successful, dispatch clearPersistedState
      await dispatch(clearPersistedState());
      window.location.reload();
      router;
    } catch (error) {
      // If there's any error in logoutUser, it will be caught here
      console.error("Logout failed", error);
    }
  };

  return (
    <button
      className="p-2 w-fit text-white rounded-[5px] transition-all my-4 bg-[#4463FB] hover:bg-[#4463FB]/90"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default Logout;

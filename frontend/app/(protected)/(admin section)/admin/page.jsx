"use client";
import { userInfo } from "@/redux/user/user-info-slice";
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
// import { logoutUser } from "@/redux/auth/logout-slice";
// import Logout from "../_components/logout";
import logout from '../../_components/logout';
function Dashboard() {
  // const dispatch = useDispatch(logoutUser)
  // const { message, loading, error } = useSelector((state) => state.myInfo);

  // useEffect(() => {
  //   if (error) {
  //     console.log(error);
  //     alert(error?.message);
  //     // window?.location.reload();
  //   }
  //   if (message !== "") {
  //     alert(message);
  //   }
  // }, [dispatch, message, loading, error?.message]);

  const onClickHandler =()=>{
    console.log(userInfo)
  }

  return (
    <div>
      <p>desh</p>
      <button onClick={onClickHandler}>Get info</button>
      {/* <Logout /> */}
    </div>
  );
}

export default Dashboard;

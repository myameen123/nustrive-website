"use client";

import React from "react";
import { Bell } from "lucide-react";
import Logout from "./logout";
// import UserMenu from "./navbar/user-menu";
function NavRoutes() {
  const onLogoutHandler = () => {
    localStorage.removeItem("userInfo");
    window.location.reload();
  };
  return (
    <div className=" w-full h-full flex items-center justify-end gap-8 px-4">
      {/* <Bell size={37} className=" mt-2" /> */}
      {/* <button
        className="p-2 w-fit text-white rounded-[5px] transition-all my-4 bg-[#111256] hover:bg-[#111256]/90"
        onClick={onLogoutHandler}
      >
        Logout
      </button> */}
      <Logout />
      {/* <UserMenu /> */}
    </div>
  );
}

export default NavRoutes;

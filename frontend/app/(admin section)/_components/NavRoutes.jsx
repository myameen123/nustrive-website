"use client";

import React from "react";
import { Bell } from "lucide-react";
// import UserMenu from "./navbar/user-menu";
function NavRoutes() {
  return (
    <div className=" w-full h-full flex items-center justify-end gap-8 px-4">
      <Bell size={37} className=" mt-2" />
      {/* <UserMenu /> */}
    </div>
  );
}

export default NavRoutes;

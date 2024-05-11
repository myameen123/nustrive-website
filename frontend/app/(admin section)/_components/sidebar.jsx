import React from "react";
import Logo from "./logo";
import SidebarRoutes from "./sidebar-routes";
import Link from "next/link";
function Sidebar() {
  return (
    <div className=" bg-white h-full border-r shadow-md">
      <div className=" p-6">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <div className=" flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
}

export default Sidebar;

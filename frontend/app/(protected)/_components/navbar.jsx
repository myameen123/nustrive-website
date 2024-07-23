import React from "react";
import MobileSidebar from "./mob-sidebar";
import NavRoutes from "./NavRoutes";

function Navbar() {
  return (
    <div className=" border-b h-full flex items-center ">
      <MobileSidebar />
      <NavRoutes />
    </div>
  );
}

export default Navbar;

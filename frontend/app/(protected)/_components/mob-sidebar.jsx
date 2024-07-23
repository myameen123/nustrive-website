import React from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Sidebar from "./sidebar";
function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger
        className=" md:hidden pr-4 hover:opacity-75 tranistion"
        aria-controls="radix-:Rbddddmqqcq:"
      >
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}

export default MobileSidebar;

"use client";
import React from "react";
// import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpenCheck,
  DraftingCompass,
  BriefcaseBusiness,
  Folder,
} from "lucide-react";
import SidebarItem from "./sidebar-item";
import { usePathname } from "next/navigation";
// import { AccessTime, Person } from "@mui/icons-material";
const studentRoutes = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/student",
  },
  {
    icon: Folder,
    label: "Files",
    href: "/student/files",
  },
  {
    icon: Folder,
    label: "Tests",
    href: "/student/tests",
  },
];
const adminRoutes = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/admin",
  },
  {
    icon: DraftingCompass,
    label: "Engineering Test",
    href: "/admin/engineering-test",
  },
  {
    icon: BriefcaseBusiness,
    label: "Business Test",
    href: "/admin/business-test",
  },
  {
    icon: BriefcaseBusiness,
    label: "Users",
    href: "/admin/users",
  },
];
function SidebarRoutes() {
  const pathname = usePathname();
  const isStudentPage = pathname.includes("/student");
  const routes = isStudentPage ? studentRoutes : adminRoutes;

  return (
    <div className=" flex flex-col w-full gap-y-2">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
}

export default SidebarRoutes;

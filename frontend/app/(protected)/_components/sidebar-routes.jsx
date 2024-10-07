"use client";
import React from "react";
// import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpenCheck,
  BookCheck,
  DraftingCompass,
  BriefcaseBusiness,
  Folder,
  School
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
    icon: School,
    label: "Courses",
    href: "/student/courses",
  },
  {
    icon: BookCheck,
    label: "Tests",
    href: "/student/tests",
  },
];
const teacherRoutes = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/teacher",
  },
  // {
  //   icon: Folder,
  //   label: "Files",
  //   href: "/teacher/files",
  // },  
  {
    icon: BookCheck,
    label: "Tests",
    href: "/teacher/tests",
  },
  {
    icon: School,
    label: "Courses",
    href: "/teacher/courses",
  },
];
const adminRoutes = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/admin",
  },
  {
    icon: LayoutDashboard,
    label: "Courses",
    href: "/admin/courses",
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
  const isTeacherPage = pathname.includes("/teacher")
  const routes = isStudentPage ? studentRoutes : (isTeacherPage ? teacherRoutes : adminRoutes);

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

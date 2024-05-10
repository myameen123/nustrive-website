"use client";
import React from "react";
// import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpenCheck,
  DraftingCompass,
  BriefcaseBusiness,
} from "lucide-react";
import SidebarItem from "./sidebar-item";
// import { AccessTime, Person } from "@mui/icons-material";
// const athleteRoutes = [
//   {
//     icon: LayoutDashboard,
//     label: "Dashboard",
//     href: "/athlete",
//   },
//   // {
//   //   icon: Person,
//   //   label: "Profile",
//   //   href: "/athlete/profile",
//   // },
//   {
//     icon: Stethoscope,
//     label: "Find a Doctor",
//     href: "/athlete/doctors",
//   },
// ];
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
];
function SidebarRoutes() {
  // const pathname = usePathname();
  // const isAthletePage = pathname.includes("/athlete");
  // const routes = isAthletePage ? athleteRoutes : doctorRoutes;

  return (
    <div className=" flex flex-col w-full gap-y-2">
      {adminRoutes.map((route) => (
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

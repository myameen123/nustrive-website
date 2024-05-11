"use client";
import { useRouter } from "next/navigation";
import Navbar from "../_components/navbar";
import Sidebar from "../_components/sidebar";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export const metadata = {
  title: "NusTrive | Admin",
  description: "Nust entry test Prepration website",
};

export default function AdminLayout({ children }) {
  const { isAuthenticated } = useSelector((state) => state.userLogin);
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  return (
    <div className=" h-full">
      <div className=" md:pl-56 h-[80px] w-full inset-y-0">
        <Navbar />
      </div>
      <div className=" h-full hidden md:flex  flex-col fixed inset-y-0 z-50 w-56">
        <Sidebar />
      </div>
      <main className=" md:pl-56 pt-1">{children}</main>
    </div>
  );
}

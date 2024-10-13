"use client";
import Loader from "../../../../components/misc/loader/loader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../_components/navbar";
import Sidebar from "../../_components/sidebar";


export default function StudentLayout({ children }) {
  const { user, isAuthenticated } = useSelector((state) => state.userLogin);
  // console.log('user->student: ', user)
  const router = useRouter();
  useEffect(() => {
    // console.log(user);
    if (!isAuthenticated) {
      router.push("/login");
    }
    if (user && user.role !== "student") {
      router.push("/login");
    }
  }, [isAuthenticated, router]);
  return (
    <div className=" h-full">
      {isAuthenticated ? (
        <>
          <div className=" md:pl-56 h-[80px] w-full inset-y-0">
            <Navbar />
          </div>
          <div className=" h-full hidden md:flex  flex-col fixed inset-y-0 z-50 w-56">
            <Sidebar />
          </div>
          <main className=" md:pl-56 pt-1">{children}</main>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

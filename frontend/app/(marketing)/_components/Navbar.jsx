"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, SquareX } from "lucide-react";

// import LoginModal from "@/components/modals/login-modal";
const ROUTES = [
  {
    id: "1",
    title: "Aggregate Calculator",
    url: "/calculator",
  },
  {
    id: "3",
    title: "Courses",
    url: "/courses",
  },
  {
    id: "5",
    title: "Tutors",
    url: "/tutors",
  },
  {
    id: "4",
    title: "Mock Test",
    url: "/mock-test",
  },
  {
    id: "2",
    title: "Contact",
    url: "/contact-us",
  },
];
function Navbar() {
  // const [openModal, setOpenModal] = useState(false);
  // const [navbarBackground, setNavbarBackground] = useState("transparent");
  const [toggleMenu, setToggleMenu] = useState(false);
  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
    // console.log("hello");
  };

  return (
    <div
      className={`fixed top-0 w-full h-16 flex md:gap-4 sm:gap-2 items-center p-4 justify-between bg-[#ffffff] transition-all ease-in-out duration-300 z-50 text-black font-semibold`}
      // className={`fixed top-0 w-full h-16 flex md:gap-4 items-center p-4 justify-between ${navbarBackground} transition-all ease-in-out duration-300 z-10 text-lg text-white font-semibold`}
    >
      <Link
        href="/"
        className="  sm:w-[20%] flex justify-center h-full md:ml-4"
      >
        {/* <Image src="/nustrive white.png" width={200} height={100} /> */}
        <Image src="/NR.png" width={50} height={70} alt="NR" />
        {/* <Image
          src="/nustrive-white.png"
          width={140}
          height={50}
          alt="nustrive-white"
          className=" md:flex hidden"
        /> */}
      </Link>
      <div className=" hidden sm:flex w-[70%] justify-center items-center h-full gap-4 sm:gap-4 md:gap-6 ">
        {ROUTES.map((r) => (
          <Link key={r.id} href={r.url}>
            {r.title}
          </Link>
        ))}
      </div>
      <div className="sm:w-[9%] sm:flex hidden h-10 bg-[#4463FB] rounded-[7px] hover:bg-[#4463FB]/90 items-center justify-center">
        <Link href={"/login"} className=" text-white pl-auto">
          Sign In
        </Link>
      </div>
      <div className="flex z-10 sm:hidden md:hidden">
        {toggleMenu ? (
          <button
            className=" cursor-pointer transition-all ease-in-out duration-300"
            onClick={handleToggleMenu}
          >
            <svg
              width="45"
              height="45"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="15"
                y="40"
                width="70"
                height="10"
                fill="#4463FB"
                transform="rotate(45 50 50)"
              ></rect>
              <rect
                x="15"
                y="40"
                width="70"
                height="10"
                fill="#4463FB"
                transform="rotate(-45 50 50)"
              ></rect>
            </svg>
          </button>
        ) : (
          <button
            className=" cursor-pointer transition-all ease-in-out duration-300"
            onClick={handleToggleMenu}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 90 80"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="100" height="12" fill="#4463FB"></rect>
              <rect y="24" width="100" height="12" fill="#4463FB"></rect>
              <rect y="48" width="100" height="12" fill="#4463FB"></rect>
            </svg>
          </button>
        )}
        {toggleMenu && (
          <div className="scale-up-center absolute top-16 right-0  shadow-xl bg-[#ffffff] border rounded">
            <ul className="flex flex-col gap-2 py-6 px-14 text-xl font-bold w-60">
              <li className=" border-b  mb-2">
                <Link href="/" onClick={handleToggleMenu}>
                  Home
                </Link>
              </li>
              <li className=" border-b mb-2">
                <Link href="/calculator" onClick={handleToggleMenu}>
                  Aggregate Calculator
                </Link>
              </li>
              <li className=" border-b mb-2">
                <Link href="/courses" onClick={handleToggleMenu}>
                  Courses
                </Link>
              </li>
              <li className=" border-b mb-2">
                <Link href="/tutors" onClick={handleToggleMenu}>
                  Tutors
                </Link>
              </li>
              <li className=" border-b mb-2">
                <Link href="/mock-test" onClick={handleToggleMenu}>
                  Mock Test
                </Link>
              </li>
              <li className=" border-b mb-2">
                <Link href="/contact-us" onClick={handleToggleMenu}>
                  Contact
                </Link>
              </li>
              <li className=" border-b mb-2">
                <Link href="/login" onClick={handleToggleMenu}>
                  Sign in
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
      {/* <Button variant="outline" className="text-lg" onClick={onClickHandler}>
        Login
      </Button>
      <LoginModal onClose={onClose} open={openModal} /> */}
    </div>
  );
}
export default Navbar;

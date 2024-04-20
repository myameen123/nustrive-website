"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, SquareX } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import LoginModal from "@/components/modals/login-modal";
const ROUTES = [
  {
    id: "1",
    title: "Aggregate Calculator",
    url: "/calculator",
  },
  {
    id: "2",
    title: "Contact Us",
    url: "/contact-us",
  },
  {
    id: "3",
    title: "Mock Test",
    url: "/mock-test",
  },
];
function Navbar() {
  const [openModal, setOpenModal] = useState(false);
  // const [navbarBackground, setNavbarBackground] = useState("transparent");
  const [toggleMenu, setToggleMenu] = useState(false);
  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
    console.log("hello");
  };

  //   const onClickHandler = () => {
  //     setOpenModal(true);
  //   };

  //   const onClose = () => {
  //     setOpenModal(false);
  //   };

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollPosition = window.scrollY;
  //     if (scrollPosition > 10) {
  //       setNavbarBackground("bg-[#111256] shadow-sm");
  //     } else {
  //       setNavbarBackground("bg-[#111256]");
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  return (
    <div
      className={`fixed top-0 w-full h-16 flex md:gap-4 items-center p-4 justify-between bg-[#111256] transition-all ease-in-out duration-300 z-10 text-white font-semibold`}
      // className={`fixed top-0 w-full h-16 flex md:gap-4 items-center p-4 justify-between ${navbarBackground} transition-all ease-in-out duration-300 z-10 text-lg text-white font-semibold`}
    >
      <Link
        href="/"
        className="  sm:w-[20%] flex justify-center h-full gap-2 md:ml-4"
      >
        {/* <Image src="/nustrive white.png" width={200} height={100} /> */}
        <Image src="/NR.png" width={50} height={70} />
        <Image
          src="/nustrive-white.png"
          width={140}
          height={50}
          className=" md:flex hidden"
        />
      </Link>
      <div className=" hidden sm:flex w-[70%] justify-center items-center h-full gap-10 ">
        {ROUTES.map((r) => (
          <Link key={r.id} href={r.url}>
            {r.title}
          </Link>
        ))}
      </div>

      <div className="md:w-[10%] sm:flex hidden">
        <Button className=" bg-[#4D6799] rounded-[7px] hover:bg-[#4D6799]/90">
          Sign In
        </Button>
      </div>
      <div className="flex z-10 sm:hidden">
        {toggleMenu ? (
          <button
            className=" cursor-pointer transition-all ease-in-out duration-300"
            onClick={handleToggleMenu}
          >
            <SquareX color="#fff" size={40} />
          </button>
        ) : (
          <button
            className=" cursor-pointer transition-all ease-in-out duration-300"
            onClick={handleToggleMenu}
          >
            <Menu color="#fff" size={40} />
          </button>
        )}
        {toggleMenu && (
          <div className="scale-up-center absolute top-16 right-0  shadow-xl bg-[#49ADE5] rounded">
            <ul className="flex flex-col gap-2 py-6 px-14 text-xl font-bold w-60">
              <li className=" border-b border-black mb-2">
                <Link href="/">Home</Link>
              </li>
              <li className=" border-b mb-2 border-black">
                <Link href="/mock-test">Mock Test</Link>
              </li>
              <li className=" border-b mb-2 border-black">
                <Link href="/calculator">Aggregate Calculator</Link>
              </li>
              <li className=" border-b mb-2 border-black">
                <Link href="/contact-us">Contact Us</Link>
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

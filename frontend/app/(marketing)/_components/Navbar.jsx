"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import NR from "../../../public/NR.png";
// import { Button } from "../../../components/ui/button";
// import { Menu, SquareX } from "lucide-react";

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
  const [toggleMenu, setToggleMenu] = useState(false);
  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  return (
    <nav
      className={`fixed top-0 w-full h-16 bg-[#ffffff] transition-all ease-in-out duration-300 z-50 `}
    >
      <div className="mx-auto max-w-[1200px] flex md:gap-4 sm:gap-2 items-center p-4 justify-between text-black font-semibold">
        <Link href="/" className=" flex justify-center h-full md:ml-4">
          <Image src={NR} width={50} height={70} alt="NR" />
        </Link>
        <div className=" hidden smd:flex w-[70%] justify-center items-center h-full gap-4 sm:gap-4 md:gap-6 ">
          {ROUTES.map((r) => (
            <Link key={r.id} href={r.url}>
              {r.title}
            </Link>
          ))}
        </div>
        <div className="px-4 smd:flex hidden h-10 bg-[#4463FB] rounded-[7px] hover:bg-[#4463FB]/90 items-center">
          <Link href={"/login"} className=" text-white pl-auto">
            Sign In
          </Link>
        </div>
        <div className="flex z-10 smd:hidden ">
          <button
            className="cursor-pointer transition-all ease-in-out duration-300"
            onClick={handleToggleMenu}
          >
            <svg width="40" height="40" viewBox="0 0 100 100">
              {toggleMenu ? (
                <g transform="rotate(45 45 45)">
                  <rect
                    x="15"
                    y="40"
                    width="80"
                    height="10"
                    fill="#4463FB"
                  ></rect>
                  <rect
                    x="15"
                    y="40"
                    width="80"
                    height="10"
                    fill="#4463FB"
                    transform="rotate(90 53 45)"
                  ></rect>
                </g>
              ) : (
                <>
                  <rect width="100" height="10" fill="#4463FB"></rect>
                  <rect y="30" width="100" height="10" fill="#4463FB"></rect>
                  <rect y="60" width="100" height="10" fill="#4463FB"></rect>
                </>
              )}
            </svg>
          </button>

          {toggleMenu && (
            <div className="absolute top-16 right-2  shadow-xl bg-[#ffffff] border rounded">
              <ul className="flex flex-col gap-2 py-6 pr-14 pl-4 text-md font-semibold max-w-[60] ">
                {ROUTES.map((route)=>(
                <li key={route.id} className=" border-b  hover:bg-[#4463FB] hover:text-white mb-2 py-1 px-3 rounded-[4px]">
                  <Link  href={route.url} onClick={handleToggleMenu}>
                    {route.title}
                  </Link>
                </li>
                ))}
                <li className=" border-b mb-2  hover:bg-[#4463FB] hover:text-white py-1 px-3 rounded-[4px]">
                  <Link href="/login" onClick={handleToggleMenu}>
                    Sign in
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
export default Navbar;

import Link from "next/link";
import React from "react";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-[#111256] text-center text-white dark:bg-neutral-600 ">
      <div className="container pt-9">
        <div className="mb-9 flex justify-center">
          <Link
            href="/"
            className="mr-9 bg-[#49ade5] border hover:border-white hover:text-white hover:bg-[#111256] text-[#111256] border-[#111256] flex justify-center items-center p-2 rounded-[7px]"
          >
            <FaFacebookF />
          </Link>
          <Link
            href="/"
            className="mr-9 bg-[#49ade5] border hover:border-white hover:text-white hover:bg-[#111256] text-[#111256] border-[#111256] flex justify-center items-center p-2 rounded-[7px]"
          >
            <FaWhatsapp />
          </Link>
          <Link
            href="/"
            className="mr-9 bg-[#49ade5] border hover:border-white hover:text-white hover:bg-[#111256] text-[#111256] border-[#111256] flex justify-center items-center p-2 rounded-[7px]"
          >
            <FiInstagram />
          </Link>
        </div>
      </div>

      {/* <!--Copyright section--> */}
      <div className="bg-[#111256] p-4 text-center text-white ">
        © 2024 Copyright:
        <Link
          href="/"
          className="text-white border px-3 py-2  rounded-[8px]  ml-2"
        >
          NUSTrive
        </Link>
      </div>
    </footer>
  );
}

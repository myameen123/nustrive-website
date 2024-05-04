"use client";
import Link from "next/link";
import React from "react";
import { FaYoutube } from "react-icons/fa";
// import { FiInstagram } from "react-icons/fi";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";

import generalInfo from "@/constants/general-info";

function ContactInfo() {
  return (
    <>
      <div className=" md:w-1/2 h-full flex flex-col justify-center items-center gap-4 text-xl ">
        <h1 className=" text-5xl font-bold ">Contact Info</h1>

        <p className=" text-xl font-bold">
          Whatsapp Number : {generalInfo.ContactNumber}
        </p>
        <p className=" text-xl font-bold">Email : {generalInfo.email}</p>

        <div className="mb-9 flex justify-center gap-4">
          <Link
            href={generalInfo.facebook}
            className=" bg-[#49ade5] border hover:border-white hover:text-white hover:bg-[#111256] text-[#111256] border-[#111256] flex justify-center items-center p-2 rounded-[7px]"
            target="_blank"
          >
            <FaFacebookF />
          </Link>
          <Link
            href={`https://wa.me/${generalInfo.whatsapp}`}
            className=" bg-[#49ade5] border hover:border-white hover:text-white hover:bg-[#111256] text-[#111256] border-[#111256] flex justify-center items-center p-2 rounded-[7px]"
            target="_blank"
          >
            <FaWhatsapp />
          </Link>
          <Link
            href={generalInfo.instagram}
            className=" bg-[#49ade5] border hover:border-white hover:text-white hover:bg-[#111256] text-[#111256] border-[#111256] flex justify-center items-center p-2 rounded-[7px]"
            target="_blank"
          >
            <FiInstagram />
          </Link>
          <Link
            href={generalInfo.youtube}
            className=" bg-[#49ade5] border hover:border-white hover:text-white hover:bg-[#111256] text-[#111256] border-[#111256] flex justify-center items-center p-2 rounded-[7px]"
            target="_blank"
          >
            <FaYoutube />
          </Link>
        </div>
      </div>
    </>
  );
}

export default ContactInfo;

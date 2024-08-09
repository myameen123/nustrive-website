import generalInfo from "@/constants/general-info";
import Link from "next/link";
import React from "react";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import  Image  from "next/image";

export default function Footer() {
  return (
    // <footer className="bg-[#ffffff] text-center text-black dark:bg-neutral-600  ">
    //   <div className="container pt-9 grid grid-cols-2 gap-20">
    //     <div>
    //     <div>
    //       <div className="flex">
    //       <Image src="/NR.png" width={50} height={70} alt="NR"  />
    //       <Image
    //       src="/nustrive-white.png"
    //       width={140}
    //       height={50}
    //       alt="nustrive-white"
    //       className=" md:flex hidden bg-[#4463FB]"
    //     />
    //       </div>
    //       {/* <span className="text-[#4463FB] text-bold text-2xl">NUSTRive</span> */}
    //       <p>
    //       NUSTrive is a premier online platform dedicated to providing comprehensive 
    //       training for university entry tests, including NET, GAT, SAT, and more. 
    //       Our platform offers tailored study plans, interactive learning modules, 
    //       and expert guidance to help students excel in their exams. 
    //       </p>
    //      </div>
    //      <div className="mb-9 flex justify-center">
    //         <Link
    //           href={generalInfo.facebook}
    //           className="mr-9 bg-[#49ade5] border hover:border-white hover:text-white hover:bg-[#111256] text-[#111256] border-[#111256] flex justify-center items-center p-2 rounded-[7px]"
    //         >
    //           <FaFacebookF />
    //         </Link>
    //         <Link
    //           href={`https://wa.me/${generalInfo.whatsapp}`}
    //           className="mr-9 bg-[#49ade5] border hover:border-white hover:text-white hover:bg-[#111256] text-[#111256] border-[#111256] flex justify-center items-center p-2 rounded-[7px]"
    //         >
    //           <FaWhatsapp />
    //         </Link>
    //         <Link
    //           href={generalInfo.instagram}
    //           className="mr-9 bg-[#49ade5] border hover:border-white hover:text-white hover:bg-[#111256] text-[#111256] border-[#111256] flex justify-center items-center p-2 rounded-[7px]"
    //         >
    //           <FiInstagram />
    //         </Link>
    //        </div>
    //     </div>
    //     <div >
    //       <div className="flex gap-32">
    //         <div>
    //         <span className="text-xl">Email Address</span>
    //         <p>nustrive@gmail.com</p>
    //         </div>
    //         <div>
    //         <span className="text-xl">Phone Number</span>
    //         <p>(+92) 33123113242</p>
    //         </div>
    //       </div>
    //       <div className="pt-28 ">
    //         <ul className="flex gap-8">
    //           <li>
    //             <Link href="/">Aggregate Calculator</Link>
    //           </li>
    //           <li>
    //             <Link href="/">Courses</Link>
    //           </li>
    //           <li>
    //             <Link href="/">Mock Tests</Link>
    //           </li>
    //           <li>
    //             <Link href="/">Contact</Link>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //   </div>

    //   {/* <!--Copyright section--> */}
    //   <div className="bg-[#ffffff] p-4 text-center text-black  text-2xl">
    //   All Rights Reserved © 
    //     <Link
    //       href="/"
    //       className="text-black   ml-2"
    //     >
    //       NUSTrive
    //     </Link>
    //   </div>
    // </footer>

    <footer className="bg-[#ffffff] text-center text-black dark:bg-neutral-600">
  <div className="container pt-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-10 md:gap-20">
    <div>
      <div>
        <div className="flex justify-center sm:justify-start">
          <Image src="/NR.png" width={50} height={70} alt="NR" />
          <Image
            src="/nustrive-white.png"
            width={140}
            height={50}
            alt="nustrive-white"
            className="hidden md:flex bg-[#4463FB] ml-2"
          />
        </div>
        <p className="mt-4 sm:mt-0 text-sm md:text-base">
          NUSTrive is a premier online platform dedicated to providing comprehensive
          training for university entry tests, including NET, GAT, SAT, and more.
          Our platform offers tailored study plans, interactive learning modules,
          and expert guidance to help students excel in their exams.
        </p>
      </div>
      <div className="mt-6 sm:mt-9 flex justify-center sm:justify-start">
        <Link
          href={generalInfo.facebook}
          className="mr-4 md:mr-9 bg-[#49ade5] border hover:border-white hover:text-white hover:bg-[#111256] text-[#111256] border-[#111256] flex justify-center items-center p-2 rounded-[7px]"
        >
          <FaFacebookF />
        </Link>
        <Link
          href={`https://wa.me/${generalInfo.whatsapp}`}
          className="mr-4 md:mr-9 bg-[#49ade5] border hover:border-white hover:text-white hover:bg-[#111256] text-[#111256] border-[#111256] flex justify-center items-center p-2 rounded-[7px]"
        >
          <FaWhatsapp />
        </Link>
        <Link
          href={generalInfo.instagram}
          className="bg-[#49ade5] border hover:border-white hover:text-white hover:bg-[#111256] text-[#111256] border-[#111256] flex justify-center items-center p-2 rounded-[7px]"
        >
          <FiInstagram />
        </Link>
      </div>
    </div>
    <div>
      <div className="flex flex-col sm:flex-row justify-between sm:gap-8 md:gap-16">
        <div className="mb-4 sm:mb-0">
          <span className="text-xl">Email Address</span>
          <p className="text-sm md:text-base">nustrive@gmail.com</p>
        </div>
        <div>
          <span className="text-xl">Phone Number</span>
          <p className="text-sm md:text-base">(+92) 33123113242</p>
        </div>
      </div>
      <div className="pt-10 sm:pt-20">
        <ul className="flex flex-col sm:flex-row justify-center sm:justify-start gap-4 sm:gap-8 text-sm md:text-base">
          <li>
            <Link href="/">Aggregate Calculator</Link>
          </li>
          <li>
            <Link href="/">Courses</Link>
          </li>
          <li>
            <Link href="/">Mock Tests</Link>
          </li>
          <li>
            <Link href="/">Contact</Link>
          </li>
        </ul>
      </div>
    </div>
  </div>

  {/* <!--Copyright section--> */}
  <div className="bg-[#ffffff] p-4 text-center text-black text-sm md:text-2xl mt-6 sm:mt-10">
    All Rights Reserved ©
    <Link href="/" className="text-black ml-2">
      NUSTrive
    </Link>
  </div>
</footer>

  );
}

import generalInfo from "@/constants/general-info";
import Link from "next/link";
import React from "react";
// import { FaFacebookF, FaWhatsapp } from "react-icons/fa6";
// import { FiInstagram } from "react-icons/fi";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full  mt-32    bg-[#ffffff]  text-black dark:bg-neutral-600">
      <div className="mr-2 ml-2 sm:mr-20 sm:ml-20 lg:mr-32 lg:ml-32 items-center grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-10 md:gap-10 ">
        <div>
          <div>
            <div className="flex justify-center sm:justify-start">
              <Image src="/NR.png" width={50} height={70} alt="NR" />
              {/* <Image
            src="/nustrive-white.png"
            width={140}
            height={50}
            alt="nustrive-white"
            className="md:flex bg-[#4463FB] ml-2"
          /> */}
              <h1 className="md:flex text-4xl  text-[#4463FB] ml-2">
                NUSTRive
              </h1>
            </div>
            <p className="mt-4 sm:mt-0 text-sm md:text-base pl-2 pr-2 sm:pl-0 sm:pr-0">
              NUSTrive is a premier online platform dedicated to providing
              comprehensive training for university entry tests, including NET,
              GAT, SAT, and more. Our platform offers tailored study plans,
              interactive learning modules, and expert guidance to help students
              excel in their exams.
            </p>
          </div>
          <div className="mt-6 sm:mt-9 flex justify-center sm:justify-center md:justify-start gap-6">
            <Link href={generalInfo.instagram}>
              {/* // className="bg-[#49ade5] border hover:border-white hover:text-white hover:bg-[#111256] text-[#111256] border-[#111256] flex justify-center items-center p-2 rounded-[7px]" */}
              <svg
                width="35"
                height="35"
                viewBox="0 0 35 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.375 2.91675H23.625C28.2917 2.91675 32.0834 6.70841 32.0834 11.3751V23.6251C32.0834 25.8684 31.1922 28.0198 29.606 29.606C28.0197 31.1923 25.8683 32.0834 23.625 32.0834H11.375C6.70835 32.0834 2.91669 28.2917 2.91669 23.6251V11.3751C2.91669 9.13179 3.80783 6.98038 5.39408 5.39414C6.98032 3.80789 9.13173 2.91675 11.375 2.91675ZM11.0834 5.83341C9.69097 5.83341 8.35561 6.38654 7.37104 7.3711C6.38648 8.35567 5.83335 9.69103 5.83335 11.0834V23.9167C5.83335 26.8188 8.18127 29.1667 11.0834 29.1667H23.9167C25.3091 29.1667 26.6444 28.6136 27.629 27.6291C28.6136 26.6445 29.1667 25.3091 29.1667 23.9167V11.0834C29.1667 8.18133 26.8188 5.83341 23.9167 5.83341H11.0834ZM25.1563 8.02091C25.6397 8.02091 26.1034 8.21297 26.4453 8.55483C26.7871 8.8967 26.9792 9.36036 26.9792 9.84383C26.9792 10.3273 26.7871 10.791 26.4453 11.1328C26.1034 11.4747 25.6397 11.6667 25.1563 11.6667C24.6728 11.6667 24.2091 11.4747 23.8673 11.1328C23.5254 10.791 23.3334 10.3273 23.3334 9.84383C23.3334 9.36036 23.5254 8.8967 23.8673 8.55483C24.2091 8.21297 24.6728 8.02091 25.1563 8.02091ZM17.5 10.2084C19.4339 10.2084 21.2886 10.9766 22.656 12.3441C24.0235 13.7115 24.7917 15.5662 24.7917 17.5001C24.7917 19.434 24.0235 21.2886 22.656 22.6561C21.2886 24.0235 19.4339 24.7917 17.5 24.7917C15.5661 24.7917 13.7115 24.0235 12.344 22.6561C10.9766 21.2886 10.2084 19.434 10.2084 17.5001C10.2084 15.5662 10.9766 13.7115 12.344 12.3441C13.7115 10.9766 15.5661 10.2084 17.5 10.2084ZM17.5 13.1251C16.3397 13.1251 15.2269 13.586 14.4064 14.4065C13.586 15.227 13.125 16.3398 13.125 17.5001C13.125 18.6604 13.586 19.7732 14.4064 20.5937C15.2269 21.4141 16.3397 21.8751 17.5 21.8751C18.6603 21.8751 19.7731 21.4141 20.5936 20.5937C21.4141 19.7732 21.875 18.6604 21.875 17.5001C21.875 16.3398 21.4141 15.227 20.5936 14.4065C19.7731 13.586 18.6603 13.1251 17.5 13.1251Z"
                  fill="#4463FB"
                />
              </svg>
              {/* <FiInstagram /> */}
            </Link>
            <Link href={generalInfo.facebook}>
              {/* // className="mr-4 md:mr-9 bg-[#49ade5] border hover:border-white hover:text-white hover:bg-[#111256] text-[#111256] border-[#111256] flex justify-center items-center p-2 rounded-[7px]" */}
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 16.84 5.44 20.87 10 21.8V15H8V12H10V9.5C10 7.57 11.57 6 13.5 6H16V9H14C13.45 9 13 9.45 13 10V12H16V15H13V21.95C18.05 21.45 22 17.19 22 12Z" fill="#4463FB"/>
                </svg>
              {/* <FaFacebookF /> */}
            </Link>
            <Link href={generalInfo.youtube}>
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M33.75 17.9015C33.75 17.8241 33.75 17.7362 33.7465 17.6343C33.743 17.3495 33.7359 17.0296 33.7289 16.6886C33.7008 15.7077 33.6516 14.7304 33.5742 13.8093C33.4688 12.5401 33.3141 11.4819 33.1031 10.6874C32.8805 9.85824 32.4442 9.10203 31.8377 8.49434C31.2313 7.88666 30.476 7.44879 29.6473 7.22451C28.6523 6.95732 26.7047 6.79209 23.9625 6.69014C22.6582 6.64092 21.2625 6.60928 19.8668 6.5917C19.3781 6.58467 18.9246 6.58115 18.5168 6.57764H17.4832C17.0754 6.58115 16.6219 6.58467 16.1332 6.5917C14.7375 6.60928 13.3418 6.64092 12.0375 6.69014C9.29531 6.79561 7.34414 6.96084 6.35273 7.22451C5.52375 7.44824 4.76813 7.88593 4.1616 8.49369C3.55507 9.10146 3.11892 9.85797 2.89688 10.6874C2.68242 11.4819 2.53125 12.5401 2.42578 13.8093C2.34844 14.7304 2.29922 15.7077 2.27109 16.6886C2.26055 17.0296 2.25703 17.3495 2.25352 17.6343C2.25352 17.7362 2.25 17.8241 2.25 17.9015V18.0983C2.25 18.1757 2.25 18.2636 2.25352 18.3655C2.25703 18.6503 2.26406 18.9702 2.27109 19.3112C2.29922 20.2921 2.34844 21.2694 2.42578 22.1905C2.53125 23.4597 2.68594 24.5179 2.89688 25.3124C3.34688 26.9964 4.66875 28.3253 6.35273 28.7753C7.34414 29.0425 9.29531 29.2077 12.0375 29.3097C13.3418 29.3589 14.7375 29.3905 16.1332 29.4081C16.6219 29.4151 17.0754 29.4187 17.4832 29.4222H18.5168C18.9246 29.4187 19.3781 29.4151 19.8668 29.4081C21.2625 29.3905 22.6582 29.3589 23.9625 29.3097C26.7047 29.2042 28.6559 29.039 29.6473 28.7753C31.3312 28.3253 32.6531 26.9999 33.1031 25.3124C33.3176 24.5179 33.4688 23.4597 33.5742 22.1905C33.6516 21.2694 33.7008 20.2921 33.7289 19.3112C33.7395 18.9702 33.743 18.6503 33.7465 18.3655C33.7465 18.2636 33.75 18.1757 33.75 18.0983V17.9015ZM31.2188 18.0843C31.2188 18.1581 31.2188 18.239 31.2152 18.3339C31.2117 18.6081 31.2047 18.9104 31.1977 19.2374C31.173 20.1726 31.1238 21.1077 31.05 21.9761C30.9551 23.1081 30.8215 24.0362 30.6562 24.6585C30.4383 25.4706 29.7984 26.114 28.9898 26.3284C28.2516 26.5253 26.3918 26.6835 23.8641 26.7784C22.5844 26.8276 21.2062 26.8593 19.8316 26.8769C19.35 26.8839 18.9035 26.8874 18.5027 26.8874H17.4973L16.1684 26.8769C14.7937 26.8593 13.4191 26.8276 12.1359 26.7784C9.6082 26.68 7.74492 26.5253 7.01016 26.3284C6.20156 26.1105 5.56172 25.4706 5.34375 24.6585C5.17852 24.0362 5.04492 23.1081 4.95 21.9761C4.87617 21.1077 4.83047 20.1726 4.80234 19.2374C4.7918 18.9104 4.78828 18.6046 4.78477 18.3339C4.78477 18.239 4.78125 18.1546 4.78125 18.0843V17.9155C4.78125 17.8417 4.78125 17.7608 4.78477 17.6659C4.78828 17.3917 4.79531 17.0894 4.80234 16.7624C4.82695 15.8272 4.87617 14.8921 4.95 14.0237C5.04492 12.8917 5.17852 11.9636 5.34375 11.3413C5.56172 10.5292 6.20156 9.88584 7.01016 9.67139C7.74844 9.47451 9.6082 9.31631 12.1359 9.22139C13.4156 9.17217 14.7937 9.14053 16.1684 9.12295C16.65 9.11592 17.0965 9.1124 17.4973 9.1124H18.5027L19.8316 9.12295C21.2062 9.14053 22.5809 9.17217 23.8641 9.22139C26.3918 9.31982 28.2551 9.47451 28.9898 9.67139C29.7984 9.88936 30.4383 10.5292 30.6562 11.3413C30.8215 11.9636 30.9551 12.8917 31.05 14.0237C31.1238 14.8921 31.1695 15.8272 31.1977 16.7624C31.2082 17.0894 31.2117 17.3952 31.2152 17.6659C31.2152 17.7608 31.2188 17.8452 31.2188 17.9155V18.0843ZM14.8711 22.7108L23.0273 17.9647L14.8711 13.289V22.7108Z"
                  fill="#4463FB"
                />
              </svg>
            </Link>
            <Link href={`https://wa.me/${generalInfo.whatsapp}`}>
              {/* className="mr-4 md:mr-9 bg-[#49ade5] border hover:border-white hover:text-white hover:bg-[#111256] text-[#111256] border-[#111256] flex justify-center items-center p-2 rounded-[7px]" */}
              <svg
                width="35"
                height="35"
                viewBox="0 0 35 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M27.7813 7.16033C26.4441 5.81007 24.8515 4.73945 23.0964 4.01086C21.3413 3.28227 19.4587 2.91029 17.5583 2.91658C9.59584 2.91658 3.10626 9.40617 3.10626 17.3687C3.10626 19.9207 3.77709 22.3999 5.03126 24.5874L2.98959 32.0833L10.6458 30.0708C12.7604 31.2228 15.1375 31.8353 17.5583 31.8353C25.5208 31.8353 32.0104 25.3458 32.0104 17.3833C32.0104 13.5187 30.5083 9.88742 27.7813 7.16033ZM17.5583 29.3853C15.4 29.3853 13.2854 28.802 11.4333 27.7083L10.9958 27.4457L6.44584 28.6416L7.65626 24.2083L7.36459 23.7562C6.16518 21.8415 5.52844 19.628 5.52709 17.3687C5.52709 10.7478 10.9229 5.352 17.5438 5.352C20.7521 5.352 23.7708 6.60617 26.0313 8.88117C27.1507 9.99513 28.0378 11.3203 28.6411 12.7798C29.2444 14.2392 29.552 15.804 29.5458 17.3833C29.575 24.0041 24.1792 29.3853 17.5583 29.3853ZM24.15 20.402C23.7854 20.227 22.0063 19.352 21.6854 19.2208C21.35 19.1041 21.1167 19.0457 20.8688 19.3958C20.6208 19.7603 19.9354 20.577 19.7313 20.8103C19.5271 21.0583 19.3083 21.0874 18.9438 20.8978C18.5792 20.7228 17.4125 20.3291 16.0417 19.1041C14.9625 18.1416 14.2479 16.9603 14.0292 16.5958C13.825 16.2312 14 16.0416 14.1896 15.852C14.35 15.6916 14.5542 15.4291 14.7292 15.2249C14.9042 15.0207 14.9771 14.8603 15.0938 14.627C15.2104 14.3791 15.1521 14.1749 15.0646 13.9999C14.9771 13.8249 14.2479 12.0457 13.9563 11.3166C13.6646 10.6166 13.3583 10.7041 13.1396 10.6895H12.4396C12.1917 10.6895 11.8125 10.777 11.4771 11.1416C11.1563 11.5062 10.2229 12.3812 10.2229 14.1603C10.2229 15.9395 11.5208 17.6603 11.6958 17.8937C11.8708 18.1416 14.2479 21.7874 17.8646 23.3478C18.725 23.727 19.3958 23.9458 19.9208 24.1062C20.7813 24.3833 21.5688 24.3395 22.1958 24.252C22.8958 24.1499 24.3396 23.377 24.6313 22.5312C24.9375 21.6853 24.9375 20.9708 24.8354 20.8103C24.7333 20.6499 24.5146 20.577 24.15 20.402Z"
                  fill="#4463FB"
                />
              </svg>
            </Link>
          </div>
        </div>
        <div className="">
          <div className="flex flex-col sm:flex-col md:flex-row items-center md:justify-between gap-8 ">
            <div className="mt-3 flex flex-col justify-center items-center">
              <p className=" text-xl sm:text-base md:text-xl font-bold ">
                Email Address
              </p>
              <p className="text-sm md:text-base">nustrive@gmail.com</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="text-xl sm:text-base md:text-xl font-bold">
                Phone Number
              </p>
              <p className="text-sm md:text-base">(+92)336 9374191</p>
            </div>
          </div>
          <div className="align-bottom pt-8 sm:pt-20">
            <ul className="flex flex-col sm:flex-row justify-center items-center  gap-2 sm:gap-4 text-sm md:text-base">
              <li>
                <Link href="/calculator">Aggregate Calculator</Link>
              </li>
              <li>
                <Link href="/courses">Courses</Link>
              </li>
              <li>
                <Link href="/mock-test">Mock Tests</Link>
              </li>
              <li>
                <Link href="/contact-us">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* <!--Copyright section--> */}
      <div className="sm:mr-20 sm:ml-20 lg:mr-32 lg:ml-32 items-center">
        <hr className="h-1 mt-8 bg-black " />
      </div>
      <div className="bg-[#ffffff] text-center text-black text-sm md:text-2xl mt-2">
        All Rights Reserved ©
        <Link href="/" className="text-black ml-2">
          NUSTrive
        </Link>
      </div>
    </footer>
  );
}

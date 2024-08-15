import Link from "next/link";
import Image from "next/image";
import whatsappSvg from "@/public/whatsapp.svg";
import generalInfo from "@/constants/general-info";
import HeroSection from "./_components/hero-section";
// import Features from "./_components/features";
import Services from "./_components/services";
import CustomizeTest from "./_components/customizeTest";
import Testimonials from "./_components/testimonials";
import Teachers from "./_components/teachers";

export default function Home() {
  return (
    <div className=" h-full">
      <HeroSection />
      <Testimonials />
      {/* <Features /> */}
      <Services />
      <CustomizeTest />
      <Teachers/>
      <div className=" fixed bottom-6 right-8 z-10 flex flex-col items-center whatsapp">
        <Link
          href={`https://wa.me/${generalInfo.whatsapp}`}
          target="_blank"
          className=" flex items-center justify-center h-12 w-12 rounded-full bg-[#24D366] cursor-pointer z-10"
        >
          <Image src={whatsappSvg} width={30} height={30} alt="whatsapp icon" />
        </Link>
        {/* <div className="w-full bg-[#fff] cursor-help border my-1 rounded-md p-1 text-xs">
          Contact Us
        </div> */}
      </div>
    </div>
  );
}

// import { Inter } from "next/font/google";
// import { Montserrat } from "next/font/google";

import Navbar from "./_components/Navbar";
import Footer from "./_components/footer";
import { ToasterProvider } from "@/components/providers/toast-provider";
// import Navbar from "./(marketing)/_components/Navbar";
// import Footer from "./footer";
// const montserrat = Montserrat({
//   weight: ["400", "700", "500", "800"],
//   style: ["normal", "italic"],
//   subsets: ["latin"],
//   display: "swap",
//   adjustFontFallback: true,
// });
export const metadata = {
  title: "NusTrive | NET/NBS online preparation",
  description: "Nust entry test Prepration website",
};

export default function MarketingLayout({ children }) {
  console.log("Pdf view layout", children)
  return (
    // <html lang="en">
      // <body className={montserrat.className}>
        <div className={` h-full`}> 
          <Navbar />
          <ToasterProvider />
          <div className=" mt-16">{children}</div>
          <Footer />
        </div>
      // </body>
    // </html>
  );
}

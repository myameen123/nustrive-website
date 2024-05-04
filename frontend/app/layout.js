// import { Inter } from "next/font/google";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "./(marketing)/_components/Navbar";
import Footer from "./footer";
import { ToasterProvider } from "@/components/providers/toast-provider";
import { ReduxProviders } from "@/redux/Provider";

// const inter = Inter({ subsets: ["latin"] });
// const montserrat = Montserrat({ subsets: ["latin"] });
const montserrat = Montserrat({
  weight: ["400", "700", "500", "800"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
});
export const metadata = {
  title: "NusTrive | NET/NBS online preparation",
  description: "Nust entry test Prepration website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <ReduxProviders>
          <div className=" h-full">
            <Navbar />
            <ToasterProvider />
            <div className=" mt-16">{children}</div>
            <Footer />
          </div>
        </ReduxProviders>
      </body>
    </html>
  );
}

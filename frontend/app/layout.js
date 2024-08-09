// import { Inter } from "next/font/google";
// import { mdSans} from "next/font/google";
import "./globals.css";
import Navbar from "./(marketing)/_components/Navbar";
import Footer from "./(marketing)/_components/footer";
import { ToasterProvider } from "@/components/providers/toast-provider";
import { ReduxProviders } from "@/redux/Provider";

// const inter = Inter({ subsets: ["latin"] });
// const montserrat = Montserrat({ subsets: ["latin"] });
// const mdSans = mdSans({
//   weight: ["400", "700", "500", "800"],
//   style: ["normal", "italic"],
//   subsets: ["Sans"],
//   display: "swap",
//   adjustFontFallback: true,
// });
export const metadata = {
  title: "NusTrive | NET/NBS online preparation",
  description: "Nust entry test Prepration website",
};

export default function RootLayout({ children }) {
  // console.log("main layout page : ", children)
  return (
    <html lang="en">
      <body className={``} style={{
  "font-family":[ "DM Sans", "sans-serif"],
  "font-optical-sizing": "auto",
  "font-weight": "400",
  "font-style": "normal",
}}>
        <ToasterProvider />
        <ReduxProviders>{children}</ReduxProviders>
      </body>
    </html>
  );
}

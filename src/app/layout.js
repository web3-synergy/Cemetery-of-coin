import { Red_Hat_Display, Lexend } from "next/font/google";
import { AppKitProvider } from "@/AppKitProvider";
import "bootstrap/dist/css/bootstrap.min.css";

// import Navbar from "@/Components/layouts/Navbar";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export const metadata = {
  title: "Cementry of coins ",
  description: "Cementry of coins",
};

const red_hat_display = Red_Hat_Display({
  subsets: ["latin"],
  variable: "--font-red_hat_display",
  display: "block",
});

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "block",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${red_hat_display.variable} ${lexend.variable}`}>
        <AppKitProvider>
         <AntdRegistry>{children}</AntdRegistry>
        </AppKitProvider>
      </body>
    </html>
  );
}

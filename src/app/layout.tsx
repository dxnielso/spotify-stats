import { Montserrat } from "next/font/google";
import { Metadata } from "next";
import "./globals.css";
// Components
import SideMenu from "@/components/sideMenu/SideMenu";
import AuthCheck from "@/components/AuthCheck";
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Spotify Stats",
    default: "Spotify Stats",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`h-full w-full ${montserrat.className}`}>
      <body className="select-none">
        <AuthCheck>
          <SideMenu />
          {children}
        </AuthCheck>
      </body>
    </html>
  );
}

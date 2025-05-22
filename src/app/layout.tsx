import "./globals.css";
import Image from "next/image";
import type { LayoutProps } from "@/app/types/layout";
import { FaInstagram, FaFacebook, FaGithub, FaInfoCircle } from "react-icons/fa";


export const metadata = {
  title: "Showzy",
  description: "TV Show aplikacija u Next.js uz App Router",
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="hr">
      <header className="p-4">
        <div className="flex justify-center">
          <Image
            src="/slike/logo.png"
            alt="pas"
            width={500}
            height={1500}
            className="rounded-lg shadow-lg"
          />
        </div></header>
      <body>
        {children}
      </body>
      <footer className="bg-gray-100 py-10 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center sm:justify-end">
            <Image
              src="/slike/bejbi.png"
              alt="Beautiful dog"
              width={200}
              height={200}
              className="rounded-lg shadow-lg"
            />
          </div>

          <div className="text-center sm:text-left space-y-4">
            <h1 className="text-xl text-black font-semibold flex items-center justify-center sm:justify-start gap-2">
              <FaInfoCircle /> Više o meni
            </h1>
            <ul className="space-y-1 text-gray-700">
              <li>Feđa Mihajlov</li>
              <li>Učenik III. gimnazije, Split</li>
              <li>Split, Hrvatska</li>
            </ul>
            <div className="flex justify-center sm:justify-start gap-4 mt-2 text-2xl text-gray-700">
              <a
                href="https://www.instagram.com/feda_mihajlov/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-600"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.facebook.com/grom.st.7?locale=hr_HR"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600"
              >
                <FaFacebook />
              </a>
              <a
                href="https://github.com/FedaGrom"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </html>
  );
}
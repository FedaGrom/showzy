import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import type { LayoutProps } from "@/app/types/layout";
import { FaInstagram, FaFacebook, FaGithub, FaInfoCircle, FaSearch, FaStar, FaRegStar} from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";


export const metadata = {
  title: "Showzy",
  description: "TV Show aplikacija u Next.js uz App Router",
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="hr">
      <body className="min-h-screen flex flex-col">
        <header className="bg-zinc-900 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-md">
          <div className="flex items-center gap-6">

            <Link href="/">
              <Image
                src="/slike/logo.png"
                alt="Logo"
                width={200}
                height={80}
                className="h-20 w-auto object-contain rounded-sm"
              />
            </Link>

            <Link href="/" className="text-white hover:text-gray-300">
              <AiFillHome size={28} />
            </Link>
            <Link href="/search" className="text-white hover:text-gray-300">
              <FaSearch className="text-xl" />
            </Link>
            <Link href="/favorites" className="text-white hover:text-gray-300">
              <FaStar className="text-xl" />
            </Link>

          </div>
        </header>
        <main className="flex-1">{children}</main>
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
      </body>
    </html>
  );
}
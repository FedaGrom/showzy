import "./globals.css";
import type { LayoutProps } from "@/app/types/layout";

export const metadata = {
  title: "Showzy",
  description: "TV Show aplikacija u Next.js uz App Router",
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="hr">
      <body>
        <header>JuniorDev Next.js</header>
        {children}
      </body>
    </html>
  );
}
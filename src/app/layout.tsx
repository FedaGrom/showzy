import "./globals.css";
 
export const metadata = {
  title: 'Showzy',
  description: 'Pokédex aplikacija u Next.js uz App Router',
};
 
export default function RootLayout({ children }) {
  return (
    <html lang="hr">
      <body>
        <header>JuniorDev Next.js</header>
        {children}
      </body>
    </html>
  );
}
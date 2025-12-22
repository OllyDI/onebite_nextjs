import "./globals.css";
import style from "./layout.module.css";
import Link from "next/link";

export default function RootLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={style.container}>
        <header>
            <Link href={"/"}>📚 ONEBITE BOOKS</Link>
          </header>
          <main>{children}</main>
          <footer>제작 ollyd</footer>
      </body>
    </html>
  );
}

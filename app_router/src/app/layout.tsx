import { BookData } from "@/types";
import "./globals.css";
import style from "./layout.module.css";
import Link from "next/link";

/**
 * Request Memoization
 * /book api 처럼 한번의 요청에 여러 번 중복 호출되는 상황에 사용
 * 다른 메서드 구현 없이 자동으로 동작함
 */

async function Footer() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`);
  if (!res.ok) return <footer>제작 ollyd</footer>;

  const books: BookData[] = await res.json();
  const bookCount = books.length;

  return (
    <footer>
      <div>제작 ollyd</div>
      <div>{bookCount}개의 도서가 등록되어 있습니다.</div>
    </footer>
  )
}


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
          <Footer />
      </body>
    </html>
  );
}

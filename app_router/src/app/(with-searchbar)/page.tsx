import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";
import { Suspense } from "react";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { Metadata } from "next";

/**
 * Next.js fetch 메서드의 데이터 캐시 -> 기본 값이 캐싱하지 않음
 * 1. cache: 'no-store': 캐싱하지 않음
 * 2. cache: 'force-cache': 무조건 캐싱함 
 * 3. next: { revalidate: X }: X 시간을 주기로 데이터 캐싱 -> ISR과 유사
 * 4. next: { tags: ['a'] }: 요청이 들어왔을 때만 데이터 캐싱 -> On-Demand Revalidate(On-Demand ISR)
 */

/**
 * 라우트 세그먼트
 * 1. dynamic: 특정 페이지의 유형을 강제로 static, dynamic 페이지로 설정
 * dynamic = auto | force-dynamic | force-static | error 
 * auto: 기본 값, 아무것도 강제하지 않음
 * force-dynamic: 페이지를 강제로 dynamic 페이지로 설정
 * force-static: 페이지를 강제로 static 페이지로 성정
 * error: 페이지를 강제로 static 페이지로 설정, 설정하면 안되는 이유가 있으면 빌드 오류 발생
 */
// export const dynamic = ''

async function AllBooks() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`, 
    { cache: 'force-cache' }
  );
  if (!res.ok) return <div>오류가 발생했습니다 ...</div>;
  const allBooks: BookData[] = await res.json();

  return (
    <div>
      {allBooks.map((book) => 
        <BookItem key={book.id} {...book} />
      )}
    </div>
  )
}

async function RecoBooks() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    { next: { revalidate: 10 } }
  );
  if (!res.ok) return <div>오류가 발생했습니다 ...</div>;
  const recoBooks: BookData[] = await res.json();

  return (
    <div>
      {recoBooks.map((book) => 
      <BookItem key={book.id} {...book} />
      )}
    </div>
  )
}

export const metadata: Metadata = {
  title: '한입 북스',
  description: '한입 북스에 등록된 도서를 만나보세요.',
  openGraph: {
    title: '한입 북스',
    description: '한입 북스에 등록된 도서를 만나보세요.',
    images: ['/thumbnail.png'],
  },
}

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <Suspense fallback={<BookListSkeleton count={3} />}>
          <RecoBooks />
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <Suspense fallback={<BookListSkeleton count={3} />}>
          <AllBooks />
        </Suspense>
      </section>
    </div>
  );
}

import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";

/**
 * Next.js fetch 메서드의 데이터 캐시 -> 기본 값이 캐싱하지 않음
 * 1. cache: 'no-store': 캐싱하지 않음
 * 2. cache: 'force-cache': 무조건 캐싱함 
 * 3. next: { revalidate: X }: X 시간을 주기로 데이터 캐싱 -> ISR과 유사
 * 4. next: { tags: ['a'] }: 요청이 들어왔을 때만 데이터 캐싱 -> On-Demand Revalidate(On-Demand ISR)
 */

async function AllBooks() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`, 
    { cache: 'no-store' }
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

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <RecoBooks />
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <AllBooks />
      </section>
    </div>
  );
}

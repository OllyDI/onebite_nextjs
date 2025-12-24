import BookItem from "@/components/book-item";
import { BookData } from "@/types";

/**
 * searchParams를 사용하고 있어 스태틱 페이지 불가
 * 패칭 캐시만 force-cache로 설정하여 한번 방문한 페이지를 캐싱
 */
export default async function Page({ searchParams }: {
  searchParams: Promise<{ q?: string }>;
}) {
  
  const { q } = await searchParams;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    { cache: 'force-cache' }
  );
  if (!res.ok) return <div>오류가 발생했습니다 ...</div>;
  const books: BookData[] = await res.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

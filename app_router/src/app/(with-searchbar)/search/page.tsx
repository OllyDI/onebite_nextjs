import BookItem from "@/components/book-item";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";

/**
 * searchParams를 사용하고 있어 스태틱 페이지 불가
 * 패칭 캐시만 force-cache로 설정하여 한번 방문한 페이지를 캐싱
 * 
 * 
 * Suspense
 * 특정 컴포넌트를 스트리밍 되게 만듦
 * key 값을 넣어서 key가 변경 될 때마다 서스펜스를 사용
 */



async function SearchResult({q}: {q: string}) {
  await delay(1000);
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

export default async function Page({ searchParams }: {
  searchParams: Promise<{ q?: string }>;
}) {
    const { q } = await searchParams;

    return (
      <Suspense key={q || ''} fallback={<BookListSkeleton count={3} />}>
        <SearchResult q={q || ''} />
      </Suspense>
    )
}

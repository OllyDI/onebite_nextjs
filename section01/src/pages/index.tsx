// app.tsx 페이지를 제외하고는 글로벌 css를 임포트할 수 없음 -> css module 사용
import SearchableLayout from '@/components/searchable-layout'
import style from './index.module.css'
import { ReactNode } from 'react'
import BookItem from '@/components/book-item'
import { InferGetServerSidePropsType, InferGetStaticPropsType } from 'next'
import fetchBooks from '@/lib/fetch-books'
import fetchRandomBooks from '@/lib/fetch-random-books'
import Head from 'next/head'


// getServerSideProps: SSR로 작동-> 서버측에서만 실행됨. 클라이언트 관련 실행X
// export const getServerSideProps = async () => {

//   const [allBooks, recoBooks] = await Promise.all([
//     fetchBooks(),
//     fetchRandomBooks()
//   ]);

//   return {
//     props: {
//       allBooks,
//       recoBooks,
//     },
//   }
// };


// getStaticProps: SSG로 작동 -> 빌드 타입 때 단 한번만 동작
export const getStaticProps = async () => {

  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks()
  ]);

  return {
    props: {
      allBooks,
      recoBooks,
    },
    // revalidate: 10, // revalidate: ISR -> n초 주기로 데이터 재검증
  }
};

export default function Home({ 
  allBooks, 
  recoBooks, 
}: InferGetStaticPropsType<typeof getStaticProps>) {

  return (
    <>
      <Head>
        <title>한입 북스</title>
        <meta property='og:image' content='/thumbnail.png' />
        <meta property='og:title' content='한입 북스' />
        <meta property='og:description' content='한입 북스에 등록된 도서들을 만나보세요' />
      </Head>
      <div className={style.container}>
        <section>
          <h3>지금 추천하는 도서</h3>
          {recoBooks.map((book) => <BookItem key={book.id} {...book} />)}
        </section>
        <section>
          <h3>등록된 모든 도서</h3>
          {allBooks.map((book) => <BookItem key={book.id} {...book} />)}
        </section>
      </div>
    </>
  )
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}
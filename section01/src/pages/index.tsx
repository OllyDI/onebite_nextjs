// app.tsx 페이지를 제외하고는 글로벌 css를 임포트할 수 없음 -> css module 사용
import SearchableLayout from '@/components/searchable-layout'
import style from './index.module.css'
import { ReactNode } from 'react'
import books from '@/mock/books.json'
import BookItem from '@/components/book-item'

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {books.map((book) => <BookItem key={book.id} {...book} />)}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {books.map((book) => <BookItem key={book.id} {...book} />)}
      </section>
    </div>
  )
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}
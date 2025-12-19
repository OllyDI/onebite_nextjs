import SearchableLayout from "@/components/searchable-layout";
import { ReactNode, useEffect, useState } from "react";
import BookItem from "@/components/book-item";
import { GetServerSidePropsContext, GetStaticPropsContext, InferGetServerSidePropsType, InferGetStaticPropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import { useRouter } from "next/router";
import { BookData } from "@/types";
import Head from "next/head";


// export const getServerSideProps = async (context: GetServerSidePropsContext) => {

//     const q = context.query.q;
//     const books = await fetchBooks(q as string);

//     return {
//         props: {
//             books,
//         }
//     }
// }


// GetStaticPropsContext로는 쿼리 값을 가져올 수 없음 -> 빌드가 끝난 이후, 클라이언트에서 직접 구현해야 함
// export const getStaticProps = async (context: GetStaticPropsContext) => {

//     const q = context.query.q;
//     const books = await fetchBooks(q as string);

//     return {
//         props: {
//             books,
//         }
//     }
// }


export default function Page() {

    // 클라이언트에서 쿼리를 가져와서 SSG를 구현해야 함
    const [books, setBooks] = useState<BookData[]>([]);

    const router = useRouter();
    const q = router.query.q;

    const fetchSearchResult = async () => {
        const data = await fetchBooks(q as string);
        setBooks(data);
    }

    useEffect(() => {
        if (q) {
            fetchSearchResult();
        }
    }, [q])

    return (
        <div>
            <Head>
                <title>한입 북스 - 검색결과</title>
                <meta property='og:image' content='/thumbnail.png' />
                <meta property='og:title' content='한입 북스 - 검색결과' />
                <meta property='og:description' content='한입 북스에 등록된 도서들을 만나보세요' />
            </Head>
            {books.map((book) => <BookItem key={book.id} {...book} />)}
        </div>
    )
}

Page.getLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>
}
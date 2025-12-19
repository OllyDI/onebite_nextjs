import { BookData } from "@/types";

export default async function fetchOneBook(id: string): Promise<BookData | null> {

    const url = `https://nextjs-backend-for-onebite-books.vercel.app/book/${id}`;

    try {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error()
        }

        return await res.json();
    } catch (err) {
        console.log(err);
        return null;
    }
}
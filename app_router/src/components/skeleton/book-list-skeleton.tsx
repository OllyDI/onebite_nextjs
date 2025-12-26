import BookItemSkelotion from "./book-item-skeleton";

export default function BookListSkeleton({count}: {count: number}) {
    return (
        new Array(count).fill(0).map((_, idx) => <BookItemSkelotion key={`book-item-skeleton-${idx}`} />)
    )
}
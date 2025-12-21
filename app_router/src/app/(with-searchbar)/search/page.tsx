export default async function page({ searchParams }: {searchParams: Promise<{q: string}>}) {

    const { q } = await searchParams;

    return (
        <div>
            search page: {q}
        </div>
    )
}
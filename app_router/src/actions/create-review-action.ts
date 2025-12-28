'use server'

export async function createReviewAction(formData: FormData) {

    const bookId = formData.get('bookId')?.toString();
    const content = formData.get('content')?.toString();
    const author = formData.get('author')?.toString();

    if (!bookId || !content || !author) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ bookId, content, author })
      })
      console.log(res.status);
    } catch (err) {
      console.error(err);
      return;
    }
  }
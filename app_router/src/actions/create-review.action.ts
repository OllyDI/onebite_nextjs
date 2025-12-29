'use server'

import { delay } from "@/util/delay";
import { revalidatePath, updateTag } from "next/cache";

export async function createReviewAction(state: any, formData: FormData) {

    const bookId = formData.get('bookId')?.toString();
    const content = formData.get('content')?.toString();
    const author = formData.get('author')?.toString();

    if (!bookId || !content || !author) {
      return {
        status: false,
        error: '리뷰 내용과 작성자를 입력해주세요.',
      }
    };

    try {
      await delay(2000);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ bookId, content, author })
      })
      
      if (!res.ok) {
        throw new Error(res.statusText);
      }

      /**
       * revalidatePath - 인수로 전달된 페이지를 재검증
       *  - 주의 사항: 서버에서만 호출 가능, 데이터 캐시, 풀 라우트 캐시도 삭제됨
       *  - 인수
       * 1. url 주소
       * 2. 특정 경로의 모든 동적 페이지 재검증: ("/book/[id]", "page"); -> [id] 경로를 갖는 페이지 모두 재검증
       * 3. 특정 레이아웃을 갖는 모든 페이지 재검증: ("/(with-searchbar)", "layout");
       * 4. 모든 데이터 재검증: ("/", "layout");
       * 5. 태그 기준, 데이터 캐시 재검증: updateTag(`review-${bookId}`); -> fetch의 캐시 옵션 { next: { tags: [`review-${bookId}`] } }
       */
      // revalidatePath(`/book/${bookId}`);  
      updateTag(`review-${bookId}`, );

      return {
        status: true,
        error: '',
      }
    } catch (err) {
      return {
        status: false,
        error: `리뷰 작성에 실패했습니다. ${err}`
      };
    }
  }
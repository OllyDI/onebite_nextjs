/**
 * 리뷰 작성하기 버튼 - useActionState 사용
 * 버튼 중복 입력 방지, 딜레이시 로딩 중 표시 기능 활성화 ->  클라이언트 컴포넌트로 변경
 * create-review-actions.ts에 state가 첫 번째 인수로 전달됨
 * create-review-actions.ts에서  status, error를 return
 */

'use client';

import style from './review-editor.module.css'
import { createReviewAction } from '@/actions/create-review.action'
import { useActionState, useEffect } from 'react';

export default function ReviewEditor({ bookId }: { bookId: string }) {

  const [state, formAction, isPending] = useActionState(createReviewAction, null);

  useEffect(() => {
    if (state && !state.status) alert(state.error);
  }, [state])

  return (
    <section>
      <form className={style.form_container} action={formAction}>
        <input name="bookId" value={bookId} hidden readOnly />
        <textarea disabled={isPending} required name="content" placeholder="리뷰 내용" />
        <div className={style.submit_container}>
            <input disabled={isPending} required name="author" placeholder="작성자" />
            <button disabled={isPending} type="submit">{isPending ? '작성중...' : '작성하기'}</button>
        </div>
      </form>
    </section>
  )
}
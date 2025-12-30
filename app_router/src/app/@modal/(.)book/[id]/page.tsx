/**
 * 인터셉팅 라우트 페이지: ex. 인스타그램 피드
 * (.): 소괄호 안에 점이 한개 -> 동일한 경로에 인터셉팅할 컴포넌트 존재
 */

import BookPage from '@/app/book/[id]/page'
import Modal from '@/components/modal'

export default function Page(props: any) {
    return (
        <Modal>
            <BookPage {...props} /> 
        </Modal>
    )
}
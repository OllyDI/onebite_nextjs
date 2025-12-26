/**
 * loading.tsx - 스트리밍
 *  - 해당 경로 안에 있는 모든 페이지 컴포넌트에 스트리밍을 추가해줌
 *  - async가 붙어있는 비동기 컴포넌트에만 작동함
 *  - 페이지 컴포넌트에만 스트리밍을 적용할 수 있음
 *  - 쿼리스트링이 변경될 때에는 스트리밍이 작동하지 않음
 */

export default function Loading() {
    return (
        <div>Loading ...</div>
    )
}
// app.tsx 페이지를 제외하고는 글로벌 css를 임포트할 수 없음 -> css module 사용
import style from './index.module.css'

export default function Home() {
  return (
    <>
      <h1 className={style.h1}>인덱스</h1>
      <h2 className={style.h2}>H2</h2>
    </>
  )
}

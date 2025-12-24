import { BookData } from "@/types";
import style from "./page.module.css";
import { notFound } from "next/navigation";


/**
 * 동적 페이지로서 기본적으로 다이나믹 페이지로 설정됨
 * generateStaticParams를 사용하여 특정 id 페이지만 스태틱 페이지로 생성 -> page_router의 getStaticPath와 동일
 * - 주의사항
 * 리턴 값을 문자열로만 명시
 * 스태틱 페이지로 변경한 페이지는 데이터 캐싱을 하지 않은 데이터 패칭이 존재해도 스태틱 페이지로 동작
 */

// generateStaticParams로 생성한 페이지 외에는 모두 404 페이지로 이동
// export const dynamicParams = false;


// generateStaticParams 정적 파라미터 생성 메서드
export function generateStaticParams() {
  return [{id: '1'}, {id: '2'}, {id: '3'}]
}

export default async function Page({ params, }: {
  params: Promise<{ id: string | string[] }>;
}) {
    
  const { id } = await params;
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`);
  if (!res.ok) {
    if (res.status === 404) notFound();
    return <div>오류가 발생했습니다 ...</div>;
  }
  const book: BookData = await res.json();

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <div className={style.container}>
      <div className={style.cover_img_container} style={{ backgroundImage: `url('${coverImgUrl}')` }}>
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>{author} | {publisher}</div>
      <div className={style.description}>{description}</div>
    </div>
  );
}

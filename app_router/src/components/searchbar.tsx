'use client';   // 클라이언트 컴포넌트로 변경 -> 상호작용이 필요한 경우에만 클라이언트 컴포넌트로 변경

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import style from "./serachbar.module.css";


/**
 * useSearchParams 는 페이지 로드 전까지 값을 알 수 없기 때문에 빌드시 오류 발생
 * -> Searchbar 컴포넌트를 오직 클라이언트에서만 실행되게 변경 -> 서버에서 실행X
 */
export default function Searchbar() {
    
  const router = useRouter();
  const searchParams = useSearchParams();   // app router에서는 useRouter에서 쿼리 값을 불러올 수 없음 -> useSearchParams 사용
  const [search, setSearch] = useState("");

  const q = searchParams.get("q");

  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className={style.container}>
      <input value={search} onChange={onChangeSearch} onKeyDown={onKeyDown} />
      <button onClick={onSubmit}>검색</button>
    </div>
  );
}

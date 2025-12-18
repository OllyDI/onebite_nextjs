import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  
  const router = useRouter();

  // 이벤트를 통해 이동하는 페이지는 프리페칭 작동X
  const onClickButton = () => {
    router.push('/test');
  }
  // useEffect를 통해 router.prefech를 해주면 해당 페이지는 프리페칭됨
  useEffect(() => {
    router.prefetch('/test');
  }, [])

  return (
    <>
      <header>

        <Link href={'/'}>index</Link>
        <br/>
        <Link href={'/search'} prefetch={false}>search</Link> {/* prefetch={false} 하면 프리페칭 작동X */}
        <br/>
        <Link href={'/book/1'}>book/1</Link>
        <div>
          <button onClick={onClickButton}>/test 페이지로 이동</button>
        </div>
      </header>
      <Component {...pageProps} />
    </>
  )
}

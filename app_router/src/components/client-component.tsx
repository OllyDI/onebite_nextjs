/**
 * 클라이언트 컴포넌트에 서버 컴포넌트를 임포트하게 되면 서버 컴포넌트는 클라이언트 컴포넌트로 변환됨
 * 부득이하게 클라이언트 컴포넌트에서 서버 컴포넌트를 사용해야 하면 children을 사용 -> 클라이언트 컴포넌트로 변경X
 */

'use client';
import { ReactNode } from "react";

// import ServerComponent from "./server-component";

export default function ClientComponent({children}: {children: ReactNode}) {

    console.log('client component');

    return (
        <div>
            {/* <ServerComponent /> */}
            {children}
        </div>
    )
}
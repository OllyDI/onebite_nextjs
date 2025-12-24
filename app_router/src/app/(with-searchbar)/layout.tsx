import { ReactNode, Suspense } from "react";
import Searchbar from "../../components/searchbar";

/**
 * Suspense
 * 자녀 컴포넌트를 클라이언트에서만 실행되게 변경
 */

export default function Layout({ children }: {
    children: ReactNode;
}) {
    return (
        <div>
            <Suspense fallback={<div>Loading ...</div>}>
                <Searchbar />   
            </Suspense>
            {children}
        </div>
    )
}
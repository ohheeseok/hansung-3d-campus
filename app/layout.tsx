import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'한성대학교 | Campus Atlas',description:'언덕 위, 상상의 시작. 한성대학교 인터랙티브 3D 캠퍼스 아틀라스.'};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="ko"><body>{children}</body></html>}

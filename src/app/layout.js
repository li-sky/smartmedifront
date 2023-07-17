import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Smart Medi Web',
  description: '智能药箱前端',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-cn">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

import './globals.css'
import Header from './components/Header'
import { ReactNode } from 'react'


export const metadata = {
  title: 'Streaming Dashboard',
  description: 'A simplified streaming dashboard built with Next.js 14'
}


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}
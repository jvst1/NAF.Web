import './globals.css'
import { Poppins } from 'next/font/google'
import NextAuthSessionProvider from './providers/sessionProvider'

const poppins = Poppins({ weight: ['500'], subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <NextAuthSessionProvider>
          {children}
        </NextAuthSessionProvider>
      </body>
    </html>
  )
}

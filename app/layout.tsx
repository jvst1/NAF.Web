import './globals.css'
import { Poppins } from 'next/font/google'
import NextAuthSessionProvider from './providers/sessionProvider'
import CommomNavbar from './components/navbar'

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
          <CommomNavbar></CommomNavbar>
          {children}
          </NextAuthSessionProvider>
      </body>
    </html>
  )
}

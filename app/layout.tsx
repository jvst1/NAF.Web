import './globals.css'
import './globalicons.css'
import 'react-toastify/dist/ReactToastify.css';
import { Poppins } from 'next/font/google'
import { ToastContainer } from 'react-toastify';
import NextAuthSessionProvider from '@/app/src/providers/sessionProvider'

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

        <ToastContainer />
      </body>
    </html>
  )
}

'use client'

import { Accordion, AccordionItem, Avatar, Button, Input, Navbar, NavbarContent } from '@nextui-org/react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { SearchIcon } from '@/app/assets/icons/SearchIcon'

interface Props {
  children?: React.ReactNode
}

export default function AuthenticatedSidebar({ children }: Props) {
  async function logout() {
    await signOut()
  }

  const pathname = usePathname()

  return (
    <div className='grid grid-cols-12 h-screen gap-4'>
      <div className='col-span-2 h-full flex flex-col items-center justify-between py-4 border'>
        <div className='w-full flex flex-col items-center'>
          <p className='text-3xl font-bold mb-4'>NAF</p>
          <Link href="/dashboard" className={(pathname === '/dashboard' ? 'bg-gray-200 ' : '') + 'w-full p-4 hover:bg-gray-200 transition'}>Dashboard</Link>
          <Link href="/board" className={(pathname === '/board' ? 'bg-gray-200 ' : '') + 'w-full p-4 hover:bg-gray-200 transition'}>Board</Link>
          <Link href="/cadastros/operadores" className={(pathname === '/cadastros/operadores' ? 'bg-gray-200 ' : '') + 'w-full p-4 hover:bg-gray-200 transition'}>Cadastro de Operadores</Link>
          <Link href="/cadastros/area" className={(pathname === '/cadastros/area' ? 'bg-gray-200 ' : '') + 'w-full p-4 hover:bg-gray-200 transition'}>Cadastro de Área</Link>
          <Link href="/cadastros/servicos" className={(pathname === '/cadastros/servicos' ? 'bg-gray-200 ' : '') + 'w-full p-4 hover:bg-gray-200 transition'}>Cadastro de Serviços</Link>
          <Link href="/cadastros/perguntas-faq" className={(pathname === '/cadastros/perguntas-faq' ? 'bg-gray-200 ' : '') + 'w-full p-4 hover:bg-gray-200 transition'}>Cadastro de FAQ</Link>
        </div>
        <Button className='mb-8' onClick={logout} color="danger">Sair</Button>
      </div>
      <div className='col-span-10'>
        {children}
      </div>
    </div>
  )
}

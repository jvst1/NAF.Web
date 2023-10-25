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
          <Link href="/cadastros/servicos" className={(pathname === '/cadastros/servicos' ? 'bg-gray-200 ' : '') + 'w-full p-4 hover:bg-gray-200 transition'}>Cadastro de Serviços</Link>
        </div>
        <Button className='mb-8' onClick={logout} color="danger">Sair</Button>
      </div>
      <div className='col-span-10'>
        <header className='flex justify-between items-center py-4'>
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[18rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Pesquisar"
            size="lg"
            startContent={<SearchIcon />}
            type="search"
          />
          <Avatar
            isBordered
            as="button"
            className="transition-transform mr-4"
            color="secondary"
            name="Jason Hughes"
            size="sm"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
        </header>
        {children}
      </div>
    </div>
  )
}

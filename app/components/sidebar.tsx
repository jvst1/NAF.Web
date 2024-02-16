'use client'

import { Button } from '@nextui-org/react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Routes, getUserRoutes, routes } from '@/app/src/utils/routes';

interface Props {
  children?: React.ReactNode
}

export default function AuthenticatedSidebar({ children }: Props) {
  const [menuItems, setMenuItems] = useState<Routes[]>();
  const { data: session, status } = useSession()

  async function logout() {
    await signOut()
  }

  const pathname = usePathname()

  useEffect(() => {
    const menuItems = getUserRoutes(session?.user.tipoPerfil)

    setMenuItems(menuItems)
  }, [session])

  return (
    <div className='grid grid-cols-12 h-screen gap-4'>
      <div className='col-span-2 h-full flex flex-col items-center justify-between py-4 border'>
        <div className='w-full flex flex-col items-center'>
          <p className='text-3xl font-bold mb-4'>NAF</p>
          {menuItems?.map((item, index) => (
            <Link key={index} href={item.route} className={(pathname === item.route ? 'bg-gray-200 ' : '') + 'w-full p-4 hover:bg-gray-200 transition'}>
              {item.name}
            </Link>
          ))}
        </div>
        <Button className='mb-8' onClick={logout} color="danger">Sair</Button>
      </div>
      <div className='col-span-10 overflow-y-scroll'>
        {children}
      </div>
    </div>
  )
}

'use client'

import { useSession } from 'next-auth/react'
import CommomNavbar from '../../components/navbar';
import AuthenticatedSidebar from '../../components/sidebar';
import React from 'react'

interface Props {
    children?: React.ReactNode
}

export default function NavbarProvider({ children }: Props) {
    const { data: session, status } = useSession()

    return (
        <>
            {
                session?.user
                    ?
                    <AuthenticatedSidebar>
                        {children}
                    </AuthenticatedSidebar>
                    :
                    <CommomNavbar>
                        {children}
                    </CommomNavbar>
            }
        </>
    )
}

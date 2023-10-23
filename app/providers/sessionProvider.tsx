"use client"

import { SessionProvider } from 'next-auth/react'
import { NextUIProvider } from "@nextui-org/react";
import React from 'react'

interface Props {
    children?: React.ReactNode
}

export default function NextAuthSessionProvider({ children }: Props) {
    return (
        <NextUIProvider className="h-screen">
            <SessionProvider>{children}</SessionProvider>
        </NextUIProvider>
    )
}

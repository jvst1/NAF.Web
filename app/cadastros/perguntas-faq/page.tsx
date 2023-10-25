'use client'

import { useSession } from "next-auth/react"
import { useRef, useState } from "react";

export default function Home() {
    const { data: session, status } = useSession({
        required: true
    })

    if (status === "loading") {
        return <></>
    }

    return (
        <main className="h-screen flex justify-center items-center">
            <h1>Board</h1>
        </main>
    )
}

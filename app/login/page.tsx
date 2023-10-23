'use client'

import React, { useRef } from "react"
import { Input, Card, CardBody, Button, Image } from "@nextui-org/react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
    const userName = useRef("")
    const password = useRef("")

    const onSubmit = async (e: any) => {
        const result = await signIn("credentials", {
            userName: userName.current,
            password: password.current,
            redirect: true,
            callbackUrl: "/"
        })
    }

    return (
        <div className="flex flex-col h-full justify-center items-center">
            <Card className="md:w-4/12 lg:w-2/12">
                <CardBody>
                    <div className="mb-8">
                        <Input type="text" variant="underlined" label="Usuário" onChange={(e) => (userName.current = e.target.value)} />
                        <Input type="password" variant="underlined" label="Senha" onChange={(e) => (password.current = e.target.value)} />
                    </div>

                    <Button color="primary" onClick={onSubmit}>Entrar</Button>
                </CardBody>
            </Card>
        </div>
    )
}

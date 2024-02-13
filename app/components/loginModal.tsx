import React, { useRef } from 'react'

import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input } from "@nextui-org/react";
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function LoginModal({ isOpen, onOpenChange }: any) {
    const document = useRef("")
    const password = useRef("")

    const router = useRouter()

    async function login() {
        const result = await signIn("credentials", {
            document: document.current,
            password: password.current,
            redirect: false
        })

        isOpen = false

        if (result?.ok)
            router.replace('/dashboard')
        else
            toast(result?.error, { type: 'error', autoClose: 2000 })
    }

    return (
        <>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Entrar</ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    label="Documento Federal"
                                    variant="bordered"
                                    onChange={(e) => (document.current = e.target.value)}
                                />
                                <Input
                                    label="Senha"
                                    type="password"
                                    variant="bordered"
                                    onChange={(e) => (password.current = e.target.value)}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Fechar
                                </Button>
                                <Button color="primary" onPress={login}>
                                    Entrar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

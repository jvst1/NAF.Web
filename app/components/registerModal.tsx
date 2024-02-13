'use client'

import React, { useRef } from "react"

import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input } from "@nextui-org/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function RegisterModal({ isOpen, onOpenChange }: any) {
    const name = useRef("")
    const email = useRef("")
    const phoneNumber = useRef("")
    const document = useRef("")
    const nickname = useRef("")
    const password = useRef("")
    const confPassword = useRef("")

    const router = useRouter()

    async function register() {
        var request = {
            name: name.current,
            email: email.current,
            phoneNumber: phoneNumber.current,
            password: password.current,
            documentoFederal: document.current,
            apelido: nickname.current,
            tipoPerfil: 1
        }

        validarRequest()

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/User/register`, {
            method: "POST",
            body: JSON.stringify(request),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (res.ok) {
            toast("Cadastro realizado com sucesso", { type: "success", autoClose: 2000 })
            router.replace("/")
        } else {
            const data = res.json()

            data.then((error) => {
                console.log(error)
                toast(error.mensagem || error.detail, { type: "error", autoClose: 2000 })
            })
        }
    }

    function validarRequest() {
        if (password.current !== confPassword.current)
            toast("As senhas não são iguais", { hideProgressBar: true, autoClose: 2000, type: "error" })
    }

    return (
        <>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Cadastrar-se</ModalHeader>
                            <ModalBody className="grid grid-cols-12">
                                <Input
                                    autoFocus
                                    label="Nome"
                                    variant="bordered"
                                    className="col-span-12"
                                    onChange={(e) => (name.current = e.target.value)}
                                />
                                <Input
                                    label="Documento Federal"
                                    variant="bordered"
                                    className="col-span-12"
                                    onChange={(e) => (document.current = e.target.value)}
                                />
                                <Input
                                    label="Telefone"
                                    variant="bordered"
                                    className="col-span-6"
                                    onChange={(e) => (phoneNumber.current = e.target.value)}
                                />
                                <Input
                                    autoFocus
                                    label="Apelido"
                                    variant="bordered"
                                    className="col-span-6"
                                    onChange={(e) => (nickname.current = e.target.value)}
                                />
                                <Input
                                    autoFocus
                                    label="Email"
                                    variant="bordered"
                                    className="col-span-12"
                                    onChange={(e) => (email.current = e.target.value)}
                                />
                                <Input
                                    label="Senha"
                                    type="password"
                                    variant="bordered"
                                    className="col-span-6"
                                    onChange={(e) => (password.current = e.target.value)}
                                />
                                <Input
                                    label="Confirmação Senha"
                                    type="password"
                                    variant="bordered"
                                    className="col-span-6"
                                    onChange={(e) => (confPassword.current = e.target.value)}
                                />
                            </ModalBody>
                            <ModalFooter className="py-6">
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Fechar
                                </Button>
                                <Button color="primary" onPress={register}>
                                    Cadastrar-se
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

import React, { useEffect, useState } from 'react'

import { Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { toast } from 'react-toastify';
import { getSession } from 'next-auth/react';

export default function AddEditModal({ refresh, isOpen, onOpenChange, item }: any) {
    const [nome, setNome] = useState("")

    async function submit(closeModal: any) {
        let req = {
            id: item.id,
            nome: nome
        }

        const session = await getSession()

        if (item.id) {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/Area/` + item.id, {
                method: 'PUT',
                body: JSON.stringify(req),
                headers: {
                    authorization: `Bearer ${session?.user.token}`,
                    'Content-Type': 'application/json',
                }
            }).then((res) => {
                if (res.ok) {
                    toast('Alterado com sucesso', { type: 'success', autoClose: 2000 })
                    refresh()
                    closeModal()
                } else {
                    const data = res.json()

                    data.then((error) => {
                        toast(error.mensagem, { type: 'error', autoClose: 2000 })
                    })
                }
            })
        } else {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/Area`, {
                method: 'POST',
                body: JSON.stringify(req),
                headers: {
                    authorization: `Bearer ${session?.user.token}`,
                    'Content-Type': 'application/json',
                }
            }).then((res) => {
                if (res.ok) {
                    toast('Registrado com sucesso', { type: 'success', autoClose: 2000 })
                    refresh()
                    closeModal()
                } else {
                    const data = res.json()

                    data.then((error) => {
                        toast(error.mensagem, { type: 'error', autoClose: 2000 })
                    })
                }
            })
        }
    }

        useEffect(() => {
            if (item) {
                setNome(item.nome)
            }
        }, [item])

        return (
            <>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Nova Área</ModalHeader>
                                <ModalBody>
                                    <Input type="text" label="Nome" value={nome} onChange={(e: any) => setNome(e.target.value)} />
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Fechar
                                    </Button>
                                    <Button color="primary" onPress={(e: any) => submit(onClose)}>
                                        Salvar
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </>
        )
    }

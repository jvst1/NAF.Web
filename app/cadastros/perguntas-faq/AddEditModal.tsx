import React, { useEffect, useState } from 'react'

import { Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { toast } from 'react-toastify';
import { getSession } from 'next-auth/react';

export default function AddEditModal({ refresh, isOpen, onOpenChange, item }: any) {
    const [pergunta, setPergunta] = useState("")
    const [resposta, setResposta] = useState("")

    async function submit(closeModal: any) {
        closeModal()
    }

    useEffect(() => {
        if (item) {
            setPergunta(item.pergunta)
            setResposta(item.resposta)
        }
    }, [item])

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Novo Serviço</ModalHeader>
                            <ModalBody>
                                <Input type="text" label="Pergunta" value={pergunta} onChange={(e: any) => setPergunta(e.target.value)} />

                                <Input type="text" label="Resposta" value={resposta} onChange={(e: any) => setResposta(e.target.value)} />
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

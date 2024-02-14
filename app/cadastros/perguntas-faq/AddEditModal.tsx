import React, { useEffect, useState } from 'react'

import { Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Textarea } from "@nextui-org/react";
import { getSession } from 'next-auth/react';
import { toast } from 'react-toastify';

export default function AddEditModal({ refresh, isOpen, onOpenChange, item }: any) {
    const [pergunta, setPergunta] = useState("")
    const [resposta, setResposta] = useState("")

    async function submit(closeModal: any) {
        let req = {
            codigo: item.codigo,
            pergunta: pergunta,
            resposta: resposta
        }

        const session = await getSession()

        if (item.codigo) {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/PerguntaFrequente/` + item.codigo, {
                method: 'PUT',
                body: JSON.stringify(req),
                headers: {
                    authorization: `Bearer ${session?.user.token}`,
                    'Content-Type': 'application/json',
                }
            }).then((res) => {
                if (res.ok) {
                    console.log(res)
                    toast('PerguntaFrequente atualizada com sucesso.', { type: 'success', autoClose: 2000 })
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
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/PerguntaFrequente`, {
                method: 'POST',
                body: JSON.stringify(req),
                headers: {
                    authorization: `Bearer ${session?.user.token}`,
                    'Content-Type': 'application/json',
                }
            }).then((res) => {
                if (res.ok) {
                    console.log(res)
                    toast('PerguntaFrequente criada com sucesso.', { type: 'success', autoClose: 2000 })
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
                            <ModalHeader className="flex flex-col gap-1">{item.codigo ? 'Editar' : 'Nova'} Pergunta Frequente</ModalHeader>
                            <ModalBody>
                                <div className='m-4 bg-white rounded-lg p-4 h-full'>
                                    Pergunta

                                    <Textarea
                                        disableAutosize
                                        className="w-full mt-4 h-full"
                                        classNames={{
                                            input: "resize-y min-h-[70px]",
                                        }}
                                        value={pergunta}
                                        onChange={(e: any) => setPergunta(e.target.value)}
                                    />
                                </div>

                                <div className='m-4 bg-white rounded-lg p-4 h-full'>
                                    Resposta

                                    <Textarea
                                        disableAutosize
                                        className="w-full mt-4 h-full"
                                        classNames={{
                                            input: "resize-y min-h-[100px] max-h-[100px]",
                                        }}
                                        value={resposta}
                                        onChange={(e: any) => setResposta(e.target.value)}
                                    />
                                </div>
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

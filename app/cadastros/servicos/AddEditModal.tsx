import React, { useEffect, useState } from 'react'

import { Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Select, SelectItem } from "@nextui-org/react";
import { toast } from 'react-toastify';
import { getSession } from 'next-auth/react';

export default function AddEditModal({ refresh, isOpen, onOpenChange, item, areas }: any) {
    const [area, setArea] = useState("")
    const [nome, setNome] = useState("")
    const [descricao, setDescricao] = useState("")

    const handleSelectionArea = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setArea(e.target.value);
    };

    async function submit(closeModal: any) {
        const codigoArea = areas[area].codigo

        let req = {
            codigoArea: codigoArea,
            nome: nome,
            descricao: descricao
        }

        const session = await getSession()

        if (item.codigo) {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/Servico/` + item.codigo, {
                method: 'PUT',
                body: JSON.stringify(req),
                headers: {
                    authorization: `Bearer ${session?.user.token}`,
                    'Content-Type': 'application/json',
                }
            }).then((res) => {
                if (res.ok) {
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
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/Servico`, {
                method: 'POST',
                body: JSON.stringify(req),
                headers: {
                    authorization: `Bearer ${session?.user.token}`,
                    'Content-Type': 'application/json',
                }
            }).then((res) => {
                if (res.ok) {
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

        closeModal()
    }

    useEffect(() => {
        if (item) {
            setNome(item.nome)
            setDescricao(item.descricao)
            setArea(item.codigoArea)
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
                                <Select
                                    label="Área"
                                    placeholder="Selecione"
                                    selectedKeys={area}
                                    onChange={handleSelectionArea}

                                >
                                    {areas.map((area: any, index: any) => (
                                        <SelectItem key={index} value={area.codigo}>
                                            {area.nome}
                                        </SelectItem>
                                    ))}
                                </Select>

                                <Input type="text" label="Nome" value={nome} onChange={(e: any) => setNome(e.target.value)} />

                                <Input type="text" label="Descrição" value={descricao} onChange={(e: any) => setDescricao(e.target.value)} />
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

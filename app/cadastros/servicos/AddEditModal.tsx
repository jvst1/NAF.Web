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
        closeModal()
    }

    useEffect(() => {
        if (item) {
            setNome(item.nome)
            setDescricao(item.descricao)
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
                                    {areas.map((area: any) => (
                                        <SelectItem key={area.value} value={area.value}>
                                            {area.text}
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

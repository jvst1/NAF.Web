import React, { useEffect, useState } from 'react'

import { Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Select, SelectItem } from "@nextui-org/react";
import { situacoes, tiposPerfil } from '@/app/src/utils/enums'

export default function AddEditModal({ refresh, isOpen, onOpenChange, item }: any) {
    const [nome, setNome] = useState("")
    const [identificador, setIdentificador] = useState("")
    const [documento, setDocumento] = useState("")
    const [email, setEmail] = useState("")
    const [telefoneCelular, setTelefone] = useState("")
    const [tipoPerfil, setTipoPerfil] = useState("")
    const [situacao, setSituacao] = useState("")

    const handleSelectionTipoPerfil = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTipoPerfil(e.target.value);
    };

    const handleSelectionSituacao = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSituacao(e.target.value);
    };

    async function submit(closeModal: any) {
        closeModal()
    }

    useEffect(() => {
        if (item) {
            setNome(item.nome)
            setIdentificador(item.identificador)
            setDocumento(item.documentoFederal)
            setEmail(item.email)
            setTelefone(item.telefoneCelular)
            setTipoPerfil(item.tipoPerfil.toString())
            setSituacao(item.situacao.toString())
        }
    }, [item])

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Novo Operador</ModalHeader>
                            <ModalBody>
                                <Input type="text" label="Nome" value={nome} onChange={(e: any) => setNome(e.target.value)} />

                                <Input type="text" label="Identificador" value={identificador} onChange={(e: any) => setIdentificador(e.target.value)} />

                                <Input type="text" label="Documento Federal" value={documento} onChange={(e: any) => setDocumento(e.target.value)} />

                                <Input type="text" label="Email" value={email} onChange={(e: any) => setEmail(e.target.value)} />

                                <Input type="text" label="Telefone" value={telefoneCelular} onChange={(e: any) => setTelefone(e.target.value)} />

                                <Select
                                    label="Tipo Perfil"
                                    placeholder="Selecione"
                                    selectedKeys={tipoPerfil}
                                    onChange={handleSelectionTipoPerfil}
                                >
                                    {tiposPerfil.map((tipoPerfil) => (
                                        <SelectItem key={tipoPerfil.value} value={tipoPerfil.value}>
                                            {tipoPerfil.text}
                                        </SelectItem>
                                    ))}
                                </Select>

                                <Select
                                    label="Situação"
                                    placeholder="Selecione"
                                    selectedKeys={situacao}
                                    onChange={handleSelectionSituacao}
                                >
                                    {situacoes.map((situacao) => (
                                        <SelectItem key={situacao.value} value={situacao.value}>
                                            {situacao.text}
                                        </SelectItem>
                                    ))}
                                </Select>
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

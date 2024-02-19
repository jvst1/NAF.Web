import React, { useEffect, useState } from 'react'

import { Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Select, SelectItem } from "@nextui-org/react";
import { toast } from 'react-toastify';
import { getSession } from 'next-auth/react';
import { formatCNPJ, formatCPF, isValidEmail, isValidPhone } from '@brazilian-utils/brazilian-utils';
import { clearCpfCnpj } from '@/app/src/utils/clearDocument';

export default function AddEditModal({ refresh, isOpen, onOpenChange, item }: any) {
    const [nome, setNome] = useState("")
    const [identificador, setIdentificador] = useState("")
    const [documento, setDocumento] = useState("")
    const [email, setEmail] = useState("")
    const [telefoneCelular, setTelefone] = useState("")
    const [tipoPerfil, setTipoPerfil] = useState("")

    const handleSelectionTipoPerfil = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTipoPerfil(e.target.value);
    };

    async function submit(closeModal: any) {
        if (!validarRequest()) return;

        const session = await getSession();

        let req = {
            name: nome,
            email: email,
            phoneNumber: telefoneCelular,
            documentoFederal: documento,
            password: "",
            apelido: identificador,
            tipoPerfil: parseInt(tipoPerfil)
        };

        if (item.codigo) {
            fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/User/` + item.codigo,
                {
                    method: "PUT",
                    body: JSON.stringify(req),
                    headers: {
                        authorization: `Bearer ${session?.user.token}`,
                        "Content-Type": "application/json",
                    },
                }
            ).then((res) => {
                if (res.ok) {
                    toast("Usuario atualizado com sucesso.", {
                        type: "success",
                        autoClose: 2000,
                    });
                    refresh();
                    closeModal();
                } else {
                    const data = res.json();

                    data.then((error) => {
                        toast(error.mensagem, { type: "error", autoClose: 2000 });
                    });
                }
            });
        } else {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/User/Operador/register`, {
                method: "POST",
                body: JSON.stringify(req),
                headers: {
                    authorization: `Bearer ${session?.user.token}`,
                    "Content-Type": "application/json",
                },
            }).then((res) => {
                if (res.ok) {
                    toast("Usuario criado com sucesso.", {
                        type: "success",
                        autoClose: 2000,
                    });
                    refresh();
                    closeModal();
                } else {
                    const data = res.json();

                    data.then((error) => {
                        toast(error.mensagem || error.detail, { type: "error", autoClose: 2000 });
                    });
                }
            });
        }
    }

    useEffect(() => {
        if (item) {
            setNome(item.nome)
            setIdentificador(item.identificador)
            setDocumento(item.documentoFederal)
            setEmail(item.email)
            setTelefone(item.telefoneCelular)
            setTipoPerfil(item.tipoPerfil.toString())
        }
    }, [item])

    const tiposPerfil: any[] = [
        { text: "Universitário", value: 2 },
        { text: "Professor", value: 4 },
    ];

    function validarRequest() {
        if (!isValidEmail(email)) {
            toast("O email informado é inválido.", {
                hideProgressBar: true,
                autoClose: 2000,
                type: "error",
            });

            return false;
        }

        if (!isValidPhone(telefoneCelular)) {
            toast("O telefone informado é inválido.", {
                hideProgressBar: true,
                autoClose: 2000,
                type: "error",
            });

            return false;
        }

        return true
    }

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

                                <Input type="text" label="Documento Federal" value={documento} onChange={(e: any) => {
                                    const { value } = e.target;

                                    let doc = clearCpfCnpj(value)

                                    if (doc.length <= 11) {
                                        setDocumento(formatCPF(value));
                                    } else {
                                        setDocumento(formatCNPJ(value))
                                    }
                                }} />

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

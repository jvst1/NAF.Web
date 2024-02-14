import React, { useEffect, useRef, useState } from 'react'

import { Modal, ModalContent, Card, Avatar, CardBody, Textarea, Select, SelectItem, Input, Button, ModalFooter } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { getSession } from 'next-auth/react';

export default function AddNewTaskModal({ isOpen, onOpenChange, refresh, item, servicos, areas }: any) {
    const [situacao, setSituacao] = useState("")
    const [area, setArea] = useState("")
    const [servico, setServico] = useState("")
    const [solicitante, setSolicitante] = useState("")

    const [titulo, setTitulo] = useState("")
    const [descricao, setDescricao] = useState("")

    const handleSelectionServico = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setServico(e.target.value);
    };

    const handleSelectionSituacao = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSituacao(e.target.value);
    };

    async function submit(closeModal: any) {
        const session = await getSession()

        if (item.codigo) {
            const codigoUsuario = ''
            let req = {
                codigoUsuario: codigoUsuario,
                titulo: titulo,
                descricao: descricao
            }

            fetch(`${process.env.NEXT_PUBLIC_API_URL}/Chamado/` + item.codigo, {
                method: 'PUT',
                body: JSON.stringify(req),
                headers: {
                    authorization: `Bearer ${session?.user.token}`,
                    'Content-Type': 'application/json',
                }
            }).then((res) => {
                if (res.ok) {
                    console.log(res)
                    toast('Chamado atualizado com sucesso.', { type: 'success', autoClose: 2000 })
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
            const codigoServico = servicos[servico].codigo

            let req = {
                codigoUsuario: session?.user.id,
                codigoServico: codigoServico,
                titulo: titulo,
                descricao: descricao
            }

            fetch(`${process.env.NEXT_PUBLIC_API_URL}/Chamado`, {
                method: 'POST',
                body: JSON.stringify(req),
                headers: {
                    authorization: `Bearer ${session?.user.token}`,
                    'Content-Type': 'application/json',
                }
            }).then((res) => {
                if (res.ok) {
                    console.log(res)
                    toast('Chamado criada com sucesso.', { type: 'success', autoClose: 2000 })
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
            setTitulo(item.titulo)
            setDescricao(item.descricao)
            setArea(item.codigoArea)
        }
    }, [item])

    const situacoes: any[] = []

    return (
        <>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
                size='full'
                className='p-12'
            >
                <ModalContent>
                    {(onClose) => {
                        return (
                            <>
                                <h1 className='text-2xl font-medium'>
                                    {item.codigo ? item.titulo : 'Nova Task'}
                                </h1>

                                <div className='grid grid-cols-12 gap-4 mt-4 h-full'>
                                    <div className='col-span-8 flex flex-col justify-between h-full gap-4 overflow-y-scroll'>
                                        {
                                            item.codigo
                                                ?
                                                <>
                                                    <Card className='bg-gray-200 h-1/2 overflow-y-scroll'>
                                                        <div className='m-4 bg-white rounded-lg p-4 h-full flex flex-col gap-4'>
                                                            <div className="flex gap-4">
                                                                <Select
                                                                    label="Área"
                                                                    placeholder="Selecione"
                                                                    selectedKeys={situacao}
                                                                    onChange={handleSelectionSituacao}

                                                                >
                                                                    {situacoes.map((area: any, index: any) => (
                                                                        <SelectItem key={index} value={area.codigo}>Teste</SelectItem>
                                                                    ))}
                                                                </Select>

                                                                <Input type="text" label="Área" value={area} onChange={(e: any) => setArea(e.target.value)} />
                                                            </div>
                                                            <div className="flex gap-4">
                                                                <Input type="text" label="Solicitante" value={solicitante} onChange={(e: any) => setSolicitante(e.target.value)} />

                                                                <Select
                                                                    label="Serviço"
                                                                    placeholder="Selecione"
                                                                    selectedKeys={servico}
                                                                    onChange={handleSelectionServico}

                                                                >
                                                                    {servicos.map((servico: any, index: any) => (
                                                                        <SelectItem key={index} value={servico.codigo}>
                                                                            {servico.nome}
                                                                        </SelectItem>
                                                                    ))}
                                                                </Select>
                                                            </div>
                                                        </div>
                                                        <div className='m-4 bg-white rounded-lg p-4 h-full'>
                                                            Descrição

                                                            <Textarea
                                                                disableAutosize
                                                                className="w-full mt-4 h-full"
                                                                classNames={{
                                                                    input: "resize-y min-h-max",
                                                                }}
                                                                value={descricao}
                                                                onChange={(e: any) => setDescricao(e.target.value)} />
                                                        </div>
                                                    </Card>
                                                    <Card className='bg-gray-200 h-1/2 gap-4 p-4 flex flex-col justify-between'>
                                                        <div className='bg-white h-1/3 rounded-lg p-4 flex items-center'>
                                                            <Avatar />
                                                        </div>
                                                        <div className='bg-white h-full rounded-lg p-4 overflow-y-scroll'>
                                                            <div className='bg-white h-1/3 rounded-lg flex items-center'>
                                                                <Avatar />
                                                            </div>
                                                        </div>
                                                    </Card>
                                                </>
                                                :
                                                <>
                                                    <Card className='bg-gray-200 h-full overflow-y-scroll'>
                                                        <div className='m-4 bg-white rounded-lg p-4 h-full flex flex-col gap-4'>
                                                            <div className="flex gap-4">
                                                                <Input type="text" label="Titulo" value={titulo} onChange={(e: any) => setTitulo(e.target.value)} />

                                                                <Select
                                                                    label="Serviço"
                                                                    placeholder="Selecione"
                                                                    selectedKeys={servico}
                                                                    onChange={handleSelectionServico}

                                                                >
                                                                    {servicos.map((servico: any, index: any) => (
                                                                        <SelectItem key={index} value={servico.codigo}>
                                                                            {servico.nome}
                                                                        </SelectItem>
                                                                    ))}
                                                                </Select>
                                                            </div>

                                                            <div className='bg-white rounded-lg'>
                                                                Descrição

                                                                <Textarea
                                                                    disableAutosize
                                                                    className="w-full mt-4 h-full"
                                                                    classNames={{
                                                                        input: "resize-y min-h-[200px]",
                                                                    }}
                                                                    value={descricao}
                                                                    onChange={(e: any) => setDescricao(e.target.value)} />
                                                            </div>
                                                        </div>

                                                    </Card>
                                                </>
                                        }
                                    </div>

                                    <Card className='col-span-4 bg-gray-200'>
                                        <CardBody>
                                            <p>Make beautiful websites regardless of your design experience.</p>
                                        </CardBody>
                                        <ModalFooter>
                                            <Button color="danger" variant="light" onPress={onClose}>
                                                Cancelar
                                            </Button>
                                            <Button color="primary" onPress={(e: any) => submit(onClose)}>
                                                Salvar
                                            </Button>
                                        </ModalFooter>
                                    </Card>
                                </div>
                            </>
                        );
                    }}
                </ModalContent>
            </Modal>
        </>
    )
}

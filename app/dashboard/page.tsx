'use client'

import { Card, CardBody, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, Textarea, Avatar, Button } from '@nextui-org/react'
import { AddIcon } from '@/app/assets/icons/AddIcon';
import { useSession } from 'next-auth/react'
import React from 'react'

export default function Dashboard() {
    const { data: session, status } = useSession({
        required: true
    })

    let { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <div>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
                size='full'
                className='p-12'
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <h1 className='text-2xl font-medium'>Task title</h1>
                            <div className='grid grid-cols-12 gap-4 mt-4 h-full'>
                                <div className='col-span-8 flex flex-col justify-between h-full gap-4'>
                                    <Card className='bg-gray-200 h-1/2'>
                                        <div className='m-4 bg-white rounded-lg p-4 h-full'>
                                            Descrição

                                            <Textarea
                                                disableAutosize
                                                className="w-full mt-4 h-full"
                                                classNames={{
                                                    input: "resize-y min-h-[170px]",
                                                }}
                                            />
                                        </div>
                                    </Card>
                                    <Card className='bg-gray-200 h-1/2 overflow-y-auto gap-4 p-4'>
                                        <div className='bg-white rounded-lg p-4'>
                                            <Avatar />
                                        </div>

                                        <div className='bg-white rounded-lg p-4'>
                                            <Avatar />
                                        </div>

                                        <div className='bg-white rounded-lg p-4'>
                                            <Avatar />
                                        </div>

                                        <div className='bg-white rounded-lg p-4'>
                                            <Avatar />
                                        </div>
                                    </Card>
                                </div>
                                <Card className='col-span-4 bg-gray-200'>
                                    <CardBody>
                                        <p>Make beautiful websites regardless of your design experience.</p>
                                    </CardBody>
                                </Card>
                            </div>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <div className='flex justify-between items-center mt-4'>
                <h1 className='text-2xl font-medium'>Solicitações recentes</h1>

                <Button className="bg-primary mr-4 text-white" onPress={onOpen}>
                    Novo chamado
                    <AddIcon className="text-white"></AddIcon>
                </Button>
            </div>

            <div className='mt-6 gap-4 flex flex-col'>
                <Card className='mr-4'>
                    <CardBody className='px-16 h-full justify-center'>
                        <div className='flex h-16 justify-between items-center'>
                            <div className='h-full flex flex-col justify-between'>
                                <h1>Chamado</h1>
                                <h1 className='text-gray-400'>#00001</h1>
                            </div>
                            <div className='h-full flex flex-col justify-between'>
                                <h1>Status</h1>
                                <h1 className='text-danger' >Pendente</h1>
                            </div>
                            <div className='h-full flex flex-col justify-between'>
                                <h1>Data da abertura</h1>
                                <h1 className='text-gray-400'>01/09/2023 18:51</h1>
                            </div>
                            <h1 className='underline hover:cursor-pointer' onClick={onOpen}>Abrir detalhes</h1>
                        </div>
                    </CardBody>
                </Card>

                <Card className='mr-4'>
                    <CardBody className='px-16 h-full justify-center'>
                        <div className='flex h-16 justify-between items-center'>
                            <div className='h-full flex flex-col justify-between'>
                                <h1>Chamado</h1>
                                <h1 className='text-gray-400'>#00001</h1>
                            </div>
                            <div className='h-full flex flex-col justify-between'>
                                <h1>Status</h1>
                                <h1 className='text-success' >Concluido</h1>
                            </div>
                            <div className='h-full flex flex-col justify-between'>
                                <h1>Data da abertura</h1>
                                <h1 className='text-gray-400'>01/09/2023 18:51</h1>
                            </div>
                            <h1 className='underline hover:cursor-pointer' onClick={onOpen}>Abrir detalhes</h1>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

'use client'

import { Card, CardBody, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
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
                            <div className='grid grid-cols-12 gap-4 mt-4'>
                                <div className='col-span-8'>
                                    <Card>
                                        <CardBody>
                                            <p>Make beautiful websites regardless of your design experience.</p>
                                        </CardBody>
                                    </Card>
                                    <Card>
                                        <CardBody>
                                            <p>Make beautiful websites regardless of your design experience.</p>
                                        </CardBody>
                                    </Card>
                                </div>
                                <Card className='col-span-4'>
                                    <CardBody>
                                        <p>Make beautiful websites regardless of your design experience.</p>
                                    </CardBody>
                                </Card>
                            </div>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <h1 className='text-2xl font-medium mt-4'>Solicitações recentes</h1>

            <div className='mt-6 gap-4 flex flex-col'>
                <Card className='mr-4'>
                    <CardBody className='px-16 h-full justify-center'>
                        <div className='flex h-14 justify-between items-center'>
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
                        <div className='flex h-14 justify-between items-center'>
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

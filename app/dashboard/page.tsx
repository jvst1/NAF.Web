'use client'

import { Card, CardBody, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, Textarea, Avatar, Button } from '@nextui-org/react'
import { AddIcon } from '@/app/assets/icons/AddIcon';
import { getSession, useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import AddNewTaskModal from './AddNewTaskModal';
import { Task } from '../types';

export default function Dashboard() {
    const { data: session, status } = useSession({
        required: true
    })

    let { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [items, setItems] = useState<[]>([]);
    const [servicos, setServicos] = useState<[]>([]);
    const [item, setItem] = useState<Task>();

    const [refreshKey, setRefreshKey] = useState(0);

    const getServicos = async () => {
        const query = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Servico`, {
            headers: {
                authorization: `Bearer ${session?.user.token}`,
                'Content-Type': 'application/json',
            }
        })

        const response = await query.json()

        setServicos(response)
    }

    function openAddTask() {
        const task: Task = {
            codigo: ""
        }
        getServicos()
        setItem(task)
        onOpen()
    }

    function openDetails(item: any) {
        setItem(item)
        onOpen()
    }

    function refresh() {
        setRefreshKey(oldKey => oldKey + 1)
    }

    useEffect(() => {
        const getData = async () => {
            const ses = await getSession()

            const query = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Chamado`, {
                headers: {
                    authorization: `Bearer ${ses?.user.token}`,
                    'Content-Type': 'application/json',
                }
            })

            const response = await query.json()

            console.log(response)
            setItems(response)
        }
        getData()
    }, [refreshKey])

    return (
        <div>
            <div className='flex justify-between items-center mt-4'>
                <h1 className='text-2xl font-medium'>Solicitações recentes</h1>

                <Button className="bg-primary mr-4 text-white" onPress={openAddTask}>
                    Novo chamado
                    <AddIcon className="text-white"></AddIcon>
                </Button>
            </div>

            <div className='mt-6 gap-4 flex flex-col'>
                {
                    items.map((item: any, index: any) => (
                        <Card className='mr-4' key={index}>
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
                                    <Button className="bg-primary mr-4 text-white" onPress={openDetails}>
                                        Abrir detalhes
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                    ))
                }
            </div>

            <AddNewTaskModal isOpen={isOpen} onOpenChange={onOpenChange} refresh={refresh} item={item} servicos={servicos}></AddNewTaskModal>
        </div>
    )
}

'use client'

import React, { useEffect, useState } from "react";
import { BreadcrumbItem, Breadcrumbs, useDisclosure } from "@nextui-org/react";
import { getSession, useSession } from "next-auth/react";
import { Area } from "@/app/types";
import TableArea from "./TableArea";
import AddEditModal from "./AddEditModal";

export default function Area() {
    const { data: session } = useSession({
        required: true
    })

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [item, setItem] = useState<Area>();
    const [items, setItems] = useState<Area[]>([]);
    const [refreshKey, setRefreshKey] = useState(0);

    function refresh() {
        setRefreshKey(oldKey => oldKey + 1)
    }

    useEffect(() => {
        const getData = async () => {
            const ses = await getSession()

            const query = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Area`, {
                headers: {
                    authorization: `Bearer ${ses?.user.token}`,
                    'Content-Type': 'application/json',
                }
            })

            const response = await query.json()
            setItems(response)
        }
        getData()
    }, [refreshKey])

    function openEditModal(item: Area) {
        setItem(item)
        onOpen()
    }

    function openAddModal() {
        var servico: Area = {
            nome: ""
            
        }
        setItem(servico)
        onOpen()
    }

    return (
        <>
            <div className="p-2 h-5/6">
                <Breadcrumbs className="py-2">
                    <BreadcrumbItem size="lg">Cadastros</BreadcrumbItem>
                    <BreadcrumbItem size="lg">Área</BreadcrumbItem>
                </Breadcrumbs>

                <TableArea refresh={refresh} items={items} openEditModal={openEditModal} openAddModal={openAddModal}></TableArea>
            </div>

            <AddEditModal isOpen={isOpen} onOpenChange={onOpenChange} refresh={refresh} item={item}></AddEditModal>
        </>
    );
}

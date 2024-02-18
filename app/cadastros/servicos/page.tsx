'use client'

import React, { useEffect, useState } from "react";
import { BreadcrumbItem, Breadcrumbs, useDisclosure } from "@nextui-org/react";
import { getSession, useSession } from "next-auth/react";
import { Area, Servico } from "@/app/types";
import TableServicos from "./TableServicos";
import AddEditModal from "./AddEditModal";

export default function Servicos() {
    const { data: session } = useSession({
        required: true
    })

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [item, setItem] = useState<Servico>();
    const [items, setItems] = useState<Servico[]>([]);
    const [areas, setAreas] = useState<Area[]>([]);
    const [refreshKey, setRefreshKey] = useState(0);

    function refresh() {
        setRefreshKey(oldKey => oldKey + 1)
    }

    useEffect(() => {
        const getData = async () => {
            const ses = await getSession()

            const query = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Servico`, {
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

    const getAreas = async () => {
        const query = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Area`, {
            headers: {
                authorization: `Bearer ${session?.user.token}`,
                'Content-Type': 'application/json',
            }
        })

        const response = await query.json()

        setAreas(response)
    }

    function openEditModal(item: Servico) {
        getAreas()
        setItem(item)
        onOpen()
    }

    function openAddModal() {
        var servico: Servico = {
            codigo: null,
            codigoArea: "",
            nome: "",
            descricao: "",
            area: ""
        }
        getAreas()
        setItem(servico)
        onOpen()
    }

    return (
        <>
            <div className="p-2 h-5/6">
                <Breadcrumbs className="py-2">
                    <BreadcrumbItem size="lg">Cadastros</BreadcrumbItem>
                    <BreadcrumbItem size="lg">Serviços</BreadcrumbItem>
                </Breadcrumbs>

                <TableServicos refresh={refresh} items={items} openEditModal={openEditModal} openAddModal={openAddModal}></TableServicos>
            </div>

            <AddEditModal isOpen={isOpen} onOpenChange={onOpenChange} refresh={refresh} item={item} areas={areas}></AddEditModal>
        </>
    );
}

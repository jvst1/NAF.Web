'use client'

import React, { useEffect, useState } from "react";
import { BreadcrumbItem, Breadcrumbs, useDisclosure } from "@nextui-org/react";
import { getSession, useSession } from "next-auth/react";
import { Operador } from "@/app/types";
import TableOperadores from "./TableOperadores";
import AddEditModal from "./AddEditModal";

export default function Operadores() {
    const { data: session } = useSession({
        required: true
    })

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [item, setItem] = useState<Operador>();
    const [items, setItems] = useState<Operador[]>([]);
    const [refreshKey, setRefreshKey] = useState(0);

    function refresh() {
        setRefreshKey(oldKey => oldKey + 1)
    }

    useEffect(() => {
        const getData = async () => {
            const ses = await getSession()

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/User/Operador`, {
                headers: {
                    authorization: `Bearer ${ses?.user.token}`,
                    'Content-Type': 'application/json',
                }
            })

            if (res.ok && res.status === 200) {
                const response = await res.json()

                setItems(response)
            } else {
                setItems([])
            }
        }
        getData()
    }, [refreshKey])

    function openEditModal(item: Operador) {
        setItem(item)
        onOpen()
    }

    function openAddModal() {
        var operador: Operador = {
            nome: "",
            identificador: "",
            documentoFederal: "",
            email: "",
            telefoneCelular: "",
            tipoPerfil: 1,
            situacao: 1
        }
        setItem(operador)
        onOpen()
    }

    return (
        <>
            <div className="p-2 h-5/6">
                <Breadcrumbs className="py-2">
                    <BreadcrumbItem size="lg">Cadastros</BreadcrumbItem>
                    <BreadcrumbItem size="lg">Operadores</BreadcrumbItem>
                </Breadcrumbs>

                <TableOperadores refresh={refresh} items={items} openEditModal={openEditModal} openAddModal={openAddModal}></TableOperadores>
            </div>

            <AddEditModal isOpen={isOpen} onOpenChange={onOpenChange} refresh={refresh} item={item}></AddEditModal>
        </>
    );
}

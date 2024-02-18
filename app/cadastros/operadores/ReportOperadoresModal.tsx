"use client";
import { Modal, ModalContent, ModalHeader, ModalBody, Card, CardBody } from "@nextui-org/react";
import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function ReportOperadoresModal({ refresh, isOpen, onOpenChange, item }: any) {
    const [items, setItems] = useState<[]>([]);

    useEffect(() => {
        const getData = async () => {
            const ses = await getSession();

            const query = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Chamado/Operador/${item.codigo}`, {
                headers: {
                    authorization: `Bearer ${ses?.user.token}`,
                    "Content-Type": "application/json",
                },
            });

            var response = await query.json();
            setItems(response);
        }
        getData();
    })

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                <ModalContent>
                    {(onCLose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Relatorio Operador</ModalHeader>
                            <ModalBody>
                                <div className="mt-6 gap-4 flex flex-col">
                                    {items.map((item: any, index: any) => (
                                        <Card className="mr-4" key={index}>
                                            <CardBody className="px-16 h-full justify-center">
                                                <div className="flex h-16 justify-between items-center">
                                                    <div className="h-full flex flex-col justify-between w-1/4">
                                                        <h1>Chamado</h1>
                                                        <h1 className="text-gray-400">
                                                            {item.titulo}
                                                        </h1>
                                                    </div>
                                                    <div className="h-full flex flex-col justify-between w-1/4">
                                                        <h1>Hora Complementar</h1>
                                                        <h1 className="text-danger">
                                                            {item.HoraComplementar}
                                                        </h1>
                                                    </div>
                                                    <div className="h-full flex flex-col justify-between w-1/4">
                                                        <h1>Nome Usuario</h1>
                                                        <h1 className="text-gray-400">
                                                            {item.NomeUsuario}
                                                        </h1>
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    ))}
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
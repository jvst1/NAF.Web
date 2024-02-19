"use client";
import { Modal, ModalContent, ModalHeader, ModalBody, Card, CardBody, ModalFooter } from "@nextui-org/react";
import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function ReportOperadoresModal({ refresh, isOpen, onOpenChange, item }: any) {
    const [items, setItems] = useState<[]>([]);
    const [totalizadorHoras, setTotalizadorHoras] = useState<number>();

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

            var totalizador = 0;
            response.forEach((item: any) => {
                totalizador += item.horaComplementar
            });
            setTotalizadorHoras(totalizador);
        }
        getData();
    })

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                <ModalContent className="w-3/4 h-auto max-w-4xl mx-auto my-8 overflow-hidden">
                    {(onCLose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <div className="flex justify-center">
                                    Relatorio Operador
                                </div>
                                <div>
                                    Nome: {item.nome}
                                </div>
                            </ModalHeader>
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
                                                        <h1>Solicitante</h1>
                                                        <h1 className="text-gray-400">
                                                            {item.nomeUsuario}
                                                        </h1>
                                                    </div>
                                                    <div className="h-full flex flex-col justify-between w-1/4">
                                                        <h1>Hora</h1>
                                                        <h1 className="text-danger">
                                                            {item.horaComplementar}
                                                        </h1>
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    ))}
                                </div>
                            </ModalBody>
                            <ModalFooter> Total Horas: {totalizadorHoras} </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
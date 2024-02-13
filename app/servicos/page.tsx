'use client'

import React, { useState, useEffect } from 'react';
import { Card, CardBody } from '@nextui-org/react';
import { Area, Servico } from "@/app/types";

export default function Home() {
    const [areas, setAreas] = useState<Area[]>([]);
    const [services, setServices] = useState<Servico[]>([]);
    const [selectedService, setSelectedService] = useState<Servico | null>(null);
    const [openArea, setOpenArea] = useState<string | null>(null);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/Area`)
            .then(response => response.json())
            .then(data => setAreas(data))
            .catch(error => console.error("Failed to fetch areas:", error));

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/Servico`)
            .then(response => response.json())
            .then(data => setServices(data))
            .catch(error => console.error("Failed to fetch services:", error));
    }, []);

    const toggleArea = (codigo: string) => {
        if (openArea === codigo) {
            setOpenArea(null);
        } else {
            setOpenArea(codigo);
        }
    };

    const servicesCountByArea = services.reduce<Record<string, number>>((acc, service) => {
        acc[service.codigoArea] = (acc[service.codigoArea] || 0) + 1;
        return acc;
    }, {});

    const filteredAreas = areas.filter(area => servicesCountByArea[area.codigo] > 1);

    return (
        <div className="flex">
            <div className="w-64 h-screen overflow-y-auto fixed bg-gray-100 p-4">
                {filteredAreas.map(area => (
                    <div key={area.codigo}>
                        <div className="cursor-pointer p-2 hover:bg-gray-200 font-bold" onClick={() => toggleArea(area.codigo)}>
                            {area.nome}
                        </div>
                        {openArea === area.codigo && (
                            <ul className="list-disc pl-4">
                                {services.filter(service => service.codigoArea === area.codigo).map(service => (
                                    <li key={service.codigo} className="cursor-pointer p-2 hover:bg-gray-200" onClick={() => setSelectedService(service)}>
                                        {service.nome}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
            <div className="ml-64 flex-1 p-4">
                {selectedService ? (
                    <Card className="bg-gray-200 shadow rounded">
                        <CardBody>
                            <h1 className="text-lg font-bold">{selectedService.nome}</h1>
                            <p>{selectedService.descricao}</p>
                        </CardBody>
                    </Card>
                ) : (
                    <p className="text-center">Selecione um serviço para conhecer mais!</p>
                )}
            </div>
        </div>
    )
}

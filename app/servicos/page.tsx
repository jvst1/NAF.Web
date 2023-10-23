'use client'

import { Card, CardBody } from "@nextui-org/react";

export default function Home() {
    function selectCard (e: any, cardid: number) {
        console.log(cardid)
    }

    return (
        <div className="h-5/6 flex justify-evenly items-center py-4">
            <div className="w-3/4 flex flex-wrap justify-center items-center gap-12">
                <Card isPressable className="bg-gray-200 w-72 h-32" onPress={(e) => {selectCard(e, 1)}}>
                    <CardBody className="flex justify-center text-center">
                        <p>Cadastro de Imóveis Rurais</p>
                    </CardBody>
                </Card>
                <Card className="bg-gray-200 w-72 h-32">
                    <CardBody className="flex justify-center text-center">
                        <p>Cadastro de Pessoas Físicas</p>
                    </CardBody>
                </Card>
                <Card className="bg-gray-200 w-72 h-32">
                    <CardBody className="flex justify-center text-center">
                        <p>Certificado Digital</p>
                    </CardBody>
                </Card>
                <Card className="bg-gray-200 w-72 h-32">
                    <CardBody className="flex justify-center text-center">
                        <p>Declaração do Imposto sobre a Renda da Pessoa Física</p>
                    </CardBody>
                </Card>
                <Card className="bg-gray-200 w-72 h-32">
                    <CardBody className="flex justify-center text-center">
                        <p>Habilitação para utilizar o Siscomex</p>
                    </CardBody>
                </Card>
                <Card className="bg-gray-200 w-72 h-32">
                    <CardBody className="flex justify-center text-center">
                        <p>Isenção do IPI/IOF - Aquisição de Veículo para Deficiente e Autista</p>
                    </CardBody>
                </Card>
                <Card className="bg-gray-200 w-72 h-32">
                    <CardBody className="flex justify-center text-center">
                        <p>Microempreendedor Individual</p>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

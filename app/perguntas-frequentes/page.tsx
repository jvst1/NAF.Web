'use client'

import { Accordion, AccordionItem } from "@nextui-org/react";

export default function Home() {
    return (
        <div className="h-5/6 flex justify-evenly items-center px-32 py-4">
            <Accordion selectionMode="multiple">
                <AccordionItem key="1" aria-label="Accordion 1" title="Qual a data limite de entrega do Imposto de renda?">
                    Prazo para declaração do Imposto de Renda em 2023, termina dia 31 de maio.
                </AccordionItem>
                <AccordionItem key="2" aria-label="Accordion 2" title="Qual o prazo para retificações do Imposto de renda?">
                    O prazo para retificar o Imposto de Renda 2023 é de até 5 anos após o último dia do prazo de envio
                    original (que foi 31 de maio de 2023). A retificação deve ser feita em casos de erros ou falta de
                    informações.
                </AccordionItem>
                <AccordionItem key="3" aria-label="Accordion 3" title="Como recuperar a senha do Gov.com?">
                    Acessando o site https://acesso.gov.br, preencha o seu CPF, clique em “esqueci minha senha”, clique em
                    gerar QR-CODE, aponte o celular e leia o QR-CODE, após leitura, faça o reconhecimento facial e redefina
                    sua senha. No site abaixo apresenta mais formas de recuperar a senha. Com opções de e-mail, mensagem de
                    texto – SMS e credencias de banco. https://acesso.gov.br/faq/_perguntasdafaq/formarrecuperarconta.html
                </AccordionItem>
            </Accordion>
        </div>
    )
}

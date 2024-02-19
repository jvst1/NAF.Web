'use client'

import React, { useState, useEffect } from 'react';
import { Accordion, AccordionItem } from "@nextui-org/react";
import { PerguntaFrequente } from "../types";

export default function Home() {
    const [faqs, setFaqs] = useState<PerguntaFrequente[]>([]);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/PerguntaFrequente`)
            .then(response => response.json())
            .then(data => setFaqs(data))
            .catch(error => console.error("Failed to fetch FAQs:", error));
    }, []);

    function formatResponse(response: string): JSX.Element[] {
        return response.split('\n').map((item, index) => (
            <React.Fragment key={index}>
                {item}
                {index !== response.split('\n').length - 1 && <br />}
            </React.Fragment>
        ));
    }

    return (
        <div className="h-5/6 flex justify-evenly items-center px-32 py-4">
            <Accordion selectionMode="multiple">
                {faqs.map((faq) => (
                    <AccordionItem key={faq.codigo} aria-label={`Accordion ${faq.codigo}`} title={faq.pergunta}>
                        {formatResponse(faq.resposta)}
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}

'use client'

import React, { useState, useEffect } from 'react';
import { getSession, useSession } from "next-auth/react";
import { toast } from 'react-toastify';
import { formatCNPJ, formatCPF } from '@brazilian-utils/brazilian-utils';
import { Input } from '@nextui-org/react';

export default function Perfil() {

    const { data: session, status } = useSession({
        required: true,
    });

    const [nome, setNome] = useState("")
    const [identificador, setIdentificador] = useState("")
    const [documento, setDocumento] = useState("")
    const [email, setEmail] = useState("")
    const [telefoneCelular, setTelefone] = useState("")
    const [tipoPerfil, setTipoPerfil] = useState("")

    useEffect(() => {
        const fetchUserData = async () => {
            const ses = await getSession();
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/User/Perfil`, {
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${ses?.user.token}`,
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();

                if (response.ok) {
                    if (data.documentoFederal.length <= 11) {
                        data.documentoFederal = formatCPF(data.documentoFederal);
                    } else {
                        data.documentoFederal = formatCNPJ(data.documentoFederal);
                    }
                    var item = data
                    setNome(item.nome)
                    setIdentificador(item.identificador)
                    setDocumento(item.documentoFederal)
                    setEmail(item.email)
                    setTelefone(item.telefoneCelular)
                    setTipoPerfil(item.tipoPerfil)
                } else {
                    const data = await response.json();
                    toast(data.detail || data.message, { type: 'error', autoClose: 2000 })
                }
            } catch (error: any) {
                toast(error.detail || error.message, { type: 'error', autoClose: 2000 })
            }
        };

        fetchUserData();
    }, []);

    const handleSubmit = async (e: any) => {
        const ses = await getSession();

        e.preventDefault();
        try {
            let req = {
                nome: nome,
                identificador: identificador,
                email: email,
                telefoneCelular: telefoneCelular,
                documentoFederal: documento,
                tipoPerfil: tipoPerfil
            }
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
                method: 'PUT',
                headers: {
                    authorization: `Bearer ${ses?.user.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(req),
            });

            if (response.ok) {
                toast(`Perfil atualizado com sucesso!`, { type: 'success', autoClose: 2000 })
            } else {
                const data = await response.json();
                toast(data.detail || data.message, { type: 'error', autoClose: 2000 })
            }
        } catch (error: any) {
            toast(error.detail || error.message, { type: 'error', autoClose: 2000 })
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Editar Perfil</h2>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <Input type="text" label="Nome" value={nome} onChange={(e: any) => setNome(e.target.value)} />

                        <Input type="text" label="Identificador" value={identificador} onChange={(e: any) => setIdentificador(e.target.value)} />

                        <Input type="text" label="Documento Federal" isDisabled value={documento} onChange={(e: any) => setDocumento(e.target.value)} />

                        <Input type="text" label="Email" value={email} onChange={(e: any) => setEmail(e.target.value)} />

                        <Input type="text" label="Telefone" value={telefoneCelular} onChange={(e: any) => setTelefone(e.target.value)} />

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Atualizar Perfil
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

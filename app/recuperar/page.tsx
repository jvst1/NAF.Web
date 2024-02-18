"use client";

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Input } from '@nextui-org/react';
import { toast } from 'react-toastify';

const RecoverPassword: React.FC = () => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const c = searchParams.get('c')
    const d = searchParams.get('d')
    const t = searchParams.get('t')

    const [model, setModel] = useState({
        NovaSenha: '',
        Login: d as string || '',
        Token: t as string || '',
        CodigoUsuario: c as string || '',
    });
    const [confirmacaoSenha, setConfirmacaoSenha] = useState('');

    const recuperarSenha = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/User/RecuperarSenha`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(model)
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.detail);
            }

            toast(`Senha alterada com suceso!`, { type: 'success', autoClose: 2000, onClose: () => router.push("/") })
        } catch (error: any) {
            toast(error.message, { type: 'error', autoClose: 5000 })
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100 justify-center items-center">
            <div className="max-w-md w-full space-y-8">
                <div className="card bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Cadastrar Senha
                        </h2>
                    </div>
                    <form className="space-y-6" onSubmit={(e) => {
                        e.preventDefault();
                        recuperarSenha();
                    }}>
                        <Input
                            type="text"
                            placeholder="Documento federal (CPF/CNPJ)"
                            value={model.Login}
                            onChange={(e) => setModel({ ...model, Login: e.target.value })}
                            className="mt-1"
                        />
                        <Input
                            type="password"
                            autoComplete="false"
                            placeholder="Nova Senha"
                            value={model.NovaSenha}
                            onChange={(e) => setModel({ ...model, NovaSenha: e.target.value })}
                        />
                        <Input
                            type="password"
                            autoComplete="false"
                            placeholder="Confirmar Senha"
                            value={confirmacaoSenha}
                            onChange={(e) => setConfirmacaoSenha(e.target.value)}
                        />
                        {model.NovaSenha && confirmacaoSenha && model.NovaSenha !== confirmacaoSenha && (
                            <div className="text-red-500 text-sm">
                                Senhas não correspondem
                            </div>
                        )}
                        <Button
                            disabled={!model.NovaSenha || model.NovaSenha !== confirmacaoSenha}
                            type="submit"
                            color="primary">
                            Confirmar Senha
                        </Button>
                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <a href="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Voltar ao login
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RecoverPassword;
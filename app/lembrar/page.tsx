"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Lembrar() {
    const router = useRouter();
    const [model, setModel] = useState({ login: '', primeiroAcesso: false });
    const [msgRecuperacaoError, setMsgRecuperacaoError] = useState('');
    const [msgRecuperacaoSuccess, setMsgRecuperacaoSuccess] = useState('');

    const recuperarSenha = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/User/SolicitarLinkSenha`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(model)
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            setMsgRecuperacaoSuccess(`Email com link para recuperação de senha enviado para o email relacioando ao documento federal: ${model.login}`);
        } catch (error: any) {
            setMsgRecuperacaoError(error.message);
        }
    };

    const clearMsgs = () => {
        setMsgRecuperacaoError('');
        setMsgRecuperacaoSuccess('');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Recuperação de Senha</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={(e) => { e.preventDefault(); recuperarSenha(); }}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="documentoFederal" className="sr-only">Documento Federal (CPF/CNPJ)</label>
                            <input
                                id="documentoFederal"
                                name="documentoFederal"
                                type="text"
                                required
                                value={model.login}
                                onChange={(e) => setModel({ ...model, login: e.target.value })}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Informe o documento federal (CPF/CNPJ)"
                                onKeyPress={clearMsgs}
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <a href="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Voltar ao login
                            </a>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            disabled={!model.login}
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                {/* <!-- Heroicon name: solid/lock-closed --> */}
                                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    <path fillRule="evenodd" d="M3 8a5 5 0 1110 0H3zm10-4a1 1 0 100-2H7a1 1 0 100 2h6z" clipRule="evenodd" />
                                </svg>
                            </span>
                            Enviar Recuperação de Senha
                        </button>
                    </div>
                    {msgRecuperacaoError && (
                        <div className="rounded-md bg-red-50 p-4 mt-3">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        <path fillRule="evenodd" d="M3 8a5 5 0 1110 0H3zm10-4a1 1 0 100-2H7a1 1 0 100 2h6z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-red-800">{msgRecuperacaoError}</h3>
                                </div>
                            </div>
                        </div>
                    )}
                    {msgRecuperacaoSuccess && (
                        <div className="rounded-md bg-green-50 p-4 mt-3">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        <path fillRule="evenodd" d="M3 8a5 5 0 1110 0H3zm10-4a1 1 0 100-2H7a1 1 0 100 2h6z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-green-800">{msgRecuperacaoSuccess}</h3>
                                    <a href="/" className="d-block small">Voltar ao login</a>
                                </div>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

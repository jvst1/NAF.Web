'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Perfil() {
    const router = useRouter();
    const [usuario, setUsuario] = useState({
        Nome: '',
        Identificador: '',
        Email: '',
        TelefoneCelular: '',
        DocumentoFederal: '',
        TipoPerfil: '',
        Situacao: '',
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setUsuario(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        // Implement your update logic here
        console.log('Updated user info:', usuario);
        // Redirect after submit or show notification
        router.push('/some-page'); // Change '/some-page' to where you want to redirect after submit
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Editar Perfil</h2>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="nome" className="sr-only">Nome completo</label>
                            <input
                                id="nome"
                                name="Nome"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Nome"
                                value={usuario.Nome}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="identificador" className="sr-only">Apelido</label>
                            <input
                                id="identificador"
                                name="Identificador"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Identificador"
                                value={usuario.Identificador}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="sr-only">E-mail</label>
                            <input
                                id="email"
                                name="Email"
                                type="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email"
                                value={usuario.Email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="telefoneCelular" className="sr-only">Telefone Celular</label>
                            <input
                                id="telefoneCelular"
                                name="TelefoneCelular"
                                type="tel"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Telefone Celular"
                                value={usuario.TelefoneCelular}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="documentoFederal" className="sr-only">Documento Federal</label>
                            <input
                                id="documentoFederal"
                                name="DocumentoFederal"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Documento Federal (CPF/CNPJ)"
                                value={usuario.DocumentoFederal}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <fieldset className="space-y-1">
                        <legend className="sr-only">Informações fixas</legend>
                        <div>
                            <span className="block text-sm font-medium text-gray-700">Tipo de Perfil:</span>
                            <span className="block text-sm">{usuario.TipoPerfil}</span>
                        </div>
                        <div>
                            <span className="block text-sm font-medium text-gray-700">Situação:</span>
                            <span className="block text-sm">{usuario.Situacao}</span>
                        </div>
                    </fieldset>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Atualizar Perfil
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

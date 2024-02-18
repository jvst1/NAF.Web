"use client";

// pages/recover-password.tsx
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams  } from 'next/navigation'; // Correct import
import { Button, Input, Card } from '@nextui-org/react';

const RecoverPassword: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams()

    const c = searchParams.get('c')
    const e = searchParams.get('e')
    const t = searchParams.get('t')

    const [model, setModel] = useState({
        NovaSenha: '',
        Login: e as string || '',
        Token: t as string || '',
        CodigoUsuario: c as string || '',
    });
    const [confirmacaoSenha, setConfirmacaoSenha] = useState('');
    const [msgResetSuccess, setMsgResetSuccess] = useState('');
    const [msgResetError, setMsgResetError] = useState('');
    const [validToken, setValidToken] = useState(false);

    const recuperarSenha = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/User/RecuperarSenha`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(model)
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error resetting password');
            }

            setMsgResetSuccess(`Password reset successfully for: ${model.Login}`);
        } catch (error: any) {
            setMsgResetError(error.message || 'An error occurred');
        }
    };

    const validaToken = async () => {
        console.log('Implement token validation logic');
        // Implement your token validation logic here
        // Example:
        // try {
        //     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/User/ValidateToken?token=${model.Token}`);
        //     const data = await response.json();
        //     if (data.isValid) {
        //         setValidToken(true);
        //     } else {
        //         setMsgResetError('Invalid or expired token');
        //         router.push('/login'); // Redirect them to login or another appropriate page
        //     }
        // } catch (error: any) {
        //     setMsgResetError(error.message || 'An error occurred while validating token');
        // }
    };

    useEffect(() => {
        // if (t) {
        //     validaToken();
        // } else {
        //     router.push('/');
        // }
    }, [t, router]);

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
                            placeholder="Nova Senha"
                            value={model.NovaSenha}
                            onChange={(e) => setModel({ ...model, NovaSenha: e.target.value })}
                        />
                        <Input
                            type="password"
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
                    {msgResetError && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Erro!</strong>
                            <span className="block sm:inline">{msgResetError}</span>
                        </div>
                    )}
                    {msgResetSuccess && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Sucesso!</strong>
                            <span className="block sm:inline">{msgResetSuccess}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RecoverPassword;
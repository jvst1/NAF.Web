import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                document: { label: "Documento Federal", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any, req: any) {
                const request = {
                    documentoFederal: credentials?.document,
                    password: credentials?.password
                }

                var res;
                try {
                    res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Auth/login`, {
                        method: 'POST',
                        body: JSON.stringify(request),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                } catch (error) {
                    console.error('Fetch error:', error);
                    throw new Error('Error contacting authentication server: ' + error);
                }
                
                const data = await res.json()

                if (res.ok && data) {
                    return {
                        id: data.codigoUsuario,
                        email: data.email,
                        token: data.token,
                        tipoPerfil: data.tipoPerfil
                    }
                } else {
                    throw Error(data.mensagem || data.detail)
                }

                return null
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/"
    },
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },

        async session({ session, token }) {
            session.user = token as any;
            return session;
        }
    }
}
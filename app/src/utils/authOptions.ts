import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            type: "credentials",
            credentials: {
                document: { label: "Documento Federal", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const request = {
                    documentoFederal: credentials?.document,
                    password: credentials?.password
                }

                var res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Auth/login`, {
                    method: 'POST',
                    body: JSON.stringify(request),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await res.json()

                if (res.ok && data) {
                    return {
                        id: data.codigoUsuario,
                        email: data.email,
                        token: data.token,
                        tipoPerfil: data.tipoPerfil
                    }
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
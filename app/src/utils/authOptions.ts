import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            credentials: {
                document: { label: "Documento Federal", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any, req: any) {
                const request = {
                    documentoFederal: credentials?.document,
                    password: credentials?.password
                }

                try {
                    var res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Auth/login`, {
                        method: 'POST',
                        body: JSON.stringify(request),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })

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
                } catch (e) {
                    console.log(e)
                }

                return null
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: "/"
    },
    callbacks: {
        async jwt({ token, user }) {
            console.log(token)
            console.log(user)
            return { ...token, ...user };
        },

        async session({ session, token }) {
            console.log(session)
            console.log(token)
            session.user = token as any;
            return session;
        }
    }
}
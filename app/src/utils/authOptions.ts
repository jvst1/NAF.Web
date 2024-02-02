import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                userName: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            authorize(credentials, req) {
                if (credentials?.userName === "admin" && credentials?.password === "admin") {
                    return {
                        id: "1",
                        name: "Admin",
                        token: "uadafiddle",
                        email: "admin@gmail.com"
                    }
                }

                return null
            }
        })
    ],

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
import NextAuth from "next-auth/next";

declare module "next-auth" {
    interface Session {
        user: {
            id: number;
            nome: string;
            token: string;
            tipoUsuario: number;
        }
    }
}
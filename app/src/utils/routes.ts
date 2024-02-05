enum TipoUsuario {
    Comunidade = 0,
    Aluno = 1,
    Professor = 2
}

export interface Routes {
    name: string,
    route: string,
    allRoles: boolean,
    roles: TipoUsuario[]
}

export const routes: Routes[] = [
    { name: "Dashboard", route: "/dashboard", allRoles: true, roles: [] },
    { name: "Board", route: "/board", allRoles: false, roles: [TipoUsuario.Aluno, TipoUsuario.Professor] },
    { name: "Jogar pela Atlética", route: "/cadastros/operadores", allRoles: false, roles: [TipoUsuario.Professor] },
    { name: "Atleticas", route: "/cadastros/area", allRoles: false, roles: [TipoUsuario.Professor] },
    { name: "Usuários", route: "/cadastros/servicos", allRoles: false, roles: [TipoUsuario.Professor] }
]

export function getUserRoutes(tipoUsuario: any): Routes[] {
    return routes

    // .filter(route => route.allRoles || route.roles.includes(tipoUsuario))
}
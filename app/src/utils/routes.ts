enum TipoUsuario {
    Nenhum = 0,
    Comunidade = 1,
    Aluno = 2,
    Professor = 3
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
    { name: "Usuários", route: "/cadastros/operadores", allRoles: false, roles: [TipoUsuario.Professor] },
    { name: "Área", route: "/cadastros/area", allRoles: false, roles: [TipoUsuario.Professor] },
    { name: "Serviços", route: "/cadastros/servicos", allRoles: false, roles: [TipoUsuario.Professor] },
    { name: "Perguntas Frequentes", route: "/cadastros/perguntas-faq", allRoles: false, roles: [TipoUsuario.Professor, TipoUsuario.Aluno] }
]

export function getUserRoutes(tipoPerfil: any): Routes[] {
    return routes.filter(route => route.allRoles || route.roles.includes(tipoPerfil))
}
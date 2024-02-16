enum TipoUsuario {
    Nenhum = 0,
    Comunidade = 1,
    Aluno = 2,
    Professor = 4
}

export interface Routes {
    name: string,
    route: string,
    roles: TipoUsuario[]
}

export const routes: Routes[] = [
    { name: "Dashboard", route: "/dashboard", roles: [TipoUsuario.Comunidade] },
    { name: "Board", route: "/board", roles: [TipoUsuario.Aluno, TipoUsuario.Professor] },
    { name: "Perguntas Frequentes", route: "/cadastros/perguntas-faq", roles: [TipoUsuario.Professor, TipoUsuario.Aluno] },
    { name: "Usuários", route: "/cadastros/operadores", roles: [TipoUsuario.Professor] },
    { name: "Área", route: "/cadastros/area", roles: [TipoUsuario.Professor] },
    { name: "Serviços", route: "/cadastros/servicos", roles: [TipoUsuario.Professor] }
]

export function getUserRoutes(tipoPerfil: any): Routes[] {
    return routes.filter(route => route.roles.includes(tipoPerfil))
}
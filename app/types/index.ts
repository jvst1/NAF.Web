export interface Servico {
    codigo: string,
    codigoArea: string,
    area: string,
    nome: string,
    descricao: string
}

export interface PerguntaFrequente {
    codigo: string,
    pergunta: string,
    resposta: string
}

export interface Area {
    codigo: string,
    nome: string
}

export interface Operador {
    nome: string,
    identificador: string,
    documento: string,
    email: string,
    telefoneCelular: string,
    tipoPerfil: number,
    situacao: number
}
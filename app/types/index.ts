export interface Servico {
    area: string,
    nome: string,
    descricao: string
}

export interface PerguntaFrequente {
    pergunta: string,
    resposta: string
}

export interface Area {
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
export default function Sobre() {
    return (
        <div className="h-5/6 flex justify-evenly items-center">
            <div className="w-4/6">
                <h1 className="text-lg py-4">
                    O núcleo de apoio contábil fiscal é parte integrante dos cursos de Ciências Contábeis da Católica SC em
                    Joinville e Jaraguá do Sul. No NAF, os estudantes aprendem assuntos que dificilmente seriam levados para a
                    sala de aula e une as questões de cidadania com a prática pedagógica.
                </h1>
                <h1 className="text-lg py-4">
                    O núcleo oferece atendimento gratuito à comunidade na área fiscal em parceria com a Receita Federal. Os
                    serviços são realizados por acadêmicos de diversas fases dos cursos, sob a supervisão de professores
                    orientadores. Entre os serviços prestados estão: inscrições e informações cadastrais do CPF e CNPJ,
                    agendamento on-line de atendimentos na Receita Federal, consulta à situação fiscal, orientações sobre
                    declaração de imposto de renda, entre outros.
                </h1>

                <h1 className="text-xl font-bold text-center py-10">Contatos</h1>

                <div className="flex justify-between">
                    <div className="w-2/6 text-center">
                        <h1 className="font-bold text-xl py-4">Joinville</h1>
                        <div className="h-20 flex flex-col justify-around">
                            <h1>(47) 3145-9760</h1>
                            <h1 className="underline">naf@catolicasc.org.br</h1>
                            <h1>Quarta e sexta-feira, das 16h30 às 18h30.</h1>
                        </div>
                    </div>
                    <div className="w-2/6 text-center">
                        <h1 className="font-bold text-xl py-4">Jaraguá do Sul</h1>
                        <div className="h-20 flex flex-col justify-around">
                            <h1 className="underline">nafjaragua@catolicasc.org.br</h1>
                            <h1>Quintas-feiras, das 18h às 20h.</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

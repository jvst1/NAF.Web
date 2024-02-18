export const cardsData: Data[] = [
  {
    id: 0,
    title: "Pendente",
    components: [],
  },
  {
    id: 1,
    title: "Em andamento",
    components: [],
  },
  {
    id: 2,
    title: "Concluído",
    components: [],
  },
];

export interface Data {
  id: number;
  title: string;
  components: {
    codigo: number;
    titulo: string;
    descricao: string;
  }[];
}

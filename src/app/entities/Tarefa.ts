import { Prioridade } from "./Prioridade";

export interface Tarefa{
    id?: number,
    objetivo: string,
    idCriador?: number,
    idResponsavel?: number,
    idLista: number,
    tagPrioridade?: Prioridade,
    prazo?: Date,
    dataCriacao?: Date,
    dataAlteracao?: Date
}
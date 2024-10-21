import { Usuario } from "./Usuario"

export interface Comentario{
    id?: number
    conteudo: string,
    idTarefa?: number,
    comentadoEm: Date,
    criador?: Usuario
}
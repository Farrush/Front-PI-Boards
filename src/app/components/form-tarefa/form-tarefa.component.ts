import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Prioridade } from '../../entities/Prioridade';
import { TarefaService } from '../../services/tarefa.service';
import { Tarefa } from '../../entities/Tarefa';

@Component({
  selector: 'app-form-tarefa',
  templateUrl: './form-tarefa.component.html',
  styleUrl: './form-tarefa.component.scss'
})
export class FormTarefaComponent {
  constructor(private tarefaService: TarefaService){

  }
  @Input() idLista: number = 0
  prazo = ''
  objetivo = ''
  tagPrioridade: Prioridade | null = null
  @Output("criarTarefa") criarTarefa = new EventEmitter<Tarefa | null>()
  cadastrarTarefa(){
    let novaTarefa: Tarefa = {
      objetivo: this.objetivo,
      prazo: this.prazo? new Date(this.prazo).toISOString().split('.')[0]: '',
      tagPrioridade: this.tagPrioridade,
      dataCriacao: new Date().toISOString().split('.')[0],
      dataAlteracao: new Date().toISOString().split('.')[0],
      idLista: this.idLista as number
    }
    this.tarefaService.cadastrar(this.idLista as number, Number(localStorage.getItem('iduser')), novaTarefa)
    .subscribe(
      (res) => {
        this.criarTarefa.emit(res)
      },
      (err)=>{
        this.criarTarefa.emit(null)
      }
    )
  }

}

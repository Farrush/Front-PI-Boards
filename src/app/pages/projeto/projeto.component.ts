import { Component, OnInit } from '@angular/core';
import { Lista } from '../../entities/Lista';
import { ProjetoService } from '../../services/projeto.service';
import { ListaService } from '../../services/lista.service';
import { TarefaService } from '../../services/tarefa.service';
import { Tarefa } from '../../entities/Tarefa';
import {
  CdkDragDrop, moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-projeto',
  templateUrl: './projeto.component.html',
  styleUrl: './projeto.component.scss'
})
export class ProjetoComponent implements OnInit {
  idProjeto = 1
  constructor(private projService: ProjetoService, private listService: ListaService, private tarefaService: TarefaService) {

  }
  ngOnInit(): void {
    /*
    this.tarefas.set(1, [{
      id: 1,
      objetivo: 'Programar Typescript',
      idCriador: 1,
      idResponsavel: 0,
      idLista: 1,
      prazo: new Date,
      dataCriacao: new Date,

    }])
    this.tarefas.set(2, [{
      id: 2,
      objetivo: 'Programar Java',
      idCriador: 1,
      idResponsavel: 0,
      idLista: 2,
      prazo: new Date,
      dataCriacao: new Date,

    }])*/
    this.buscarListas()
    this.buscarTarefas()
  }
  buscarListas(): void {
    this.listService.findAllByProjeto(this.idProjeto)
      .subscribe((res) => {
        this.listas = res
      })
  }
  buscarTarefas(): void {
    this.listas.forEach(lista => {
      this.tarefaService.findAllByLista(lista.id as number)
        .subscribe((tarefas) => {
          this.tarefas.set(lista.id as number, tarefas.filter(tarefa => tarefa.idLista === lista.id as number))
        })
    })
  }
  trocarListaDaTarefa(event: CdkDragDrop<Tarefa[] | undefined, any, any>) {
    console.log("dragged",event.container)

  }
  listas: Lista[] = [
    /*{
      id: 1,
      titulo: 'Lista Legal',
      idProjeto: 1
  },
  {
    id: 2,
    titulo: 'Lista chata',
    idProjeto: 1
}*/
  ]
  tarefas: Map<number, Tarefa[]> = new Map()
}

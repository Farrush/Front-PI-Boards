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
  trocarListaDaTarefa(event: CdkDragDrop<Tarefa[], Tarefa[], Tarefa>) {
    console.log("dragged",event.container)

  }
  listas: Lista[] = []
  tarefas: Map<number, Tarefa[]> = new Map()
}

import { Component, OnInit } from '@angular/core';
import { Lista } from '../../entities/Lista';
import { ProjetoService } from '../../services/projeto.service';
import { ListaService } from '../../services/lista.service';
import { TarefaService } from '../../services/tarefa.service';
import { Tarefa } from '../../entities/Tarefa';
import {
  CdkDragDrop,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Projeto } from '../../entities/Projeto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projeto',
  templateUrl: './projeto.component.html',
  styleUrl: './projeto.component.scss'
})
export class ProjetoComponent implements OnInit {
  idProjeto = 0
  projeto: Projeto = {
    titulo: ''
  }
  novaLista: Lista = {
    titulo: ''
  }
  constructor(private router: Router ,private projService: ProjetoService, private listService: ListaService, private tarefaService: TarefaService) {

  }
  ngOnInit(): void {
    this.idProjeto = this.router.lastSuccessfulNavigation?.extras?.state?.["id"]
    if(this.idProjeto != undefined){
      this.buscarProjeto()
      this.buscarListas()
      this.buscarTarefas()
    }
    else{
      this.router.navigate(['/projetos'])
    }
  }
  buscarProjeto(): void{
    this.projService.findById(this.idProjeto)
    .subscribe((res)=> {
      this.projeto = res
    })
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
  trocarListaDaTarefa(event: CdkDragDrop<Tarefa[] | undefined, any, Tarefa>) {
    if(event.previousContainer !== event.container){
      this.tarefaService.atualizarListaDaTarefa(Number(event.container.id), event.item.data.id || 0)
        .subscribe((res) => {
          transferArrayItem(
            event.previousContainer.data,
            event.container.data || [],
            event.previousIndex,
            event.currentIndex,
          );
        })

    }

  }
  adicionarNovaLista(): void{
    this.listService.cadastrar(this.idProjeto, this.novaLista)
      .subscribe((newList) => {
        if(newList.id)
          this.tarefas.set(newList.id, [] as Tarefa[])//cria um novo array que representa as tarefas da nova lista
        this.listas.push(newList)// adiciona a nova lista ao front
      })
    this.novaLista.titulo = ''
  }
  apagarLista(lista: Lista): void{
    this.listService.apagar(lista.id)
    .subscribe(() => {
      if(lista.id){
        this.listas = this.listas.filter(l => l.id !== lista.id)
        this.tarefas.delete(lista.id)
      }
    })
  }
  listas: Lista[] = []
  tarefas: Map<number, Tarefa[]> = new Map()
}

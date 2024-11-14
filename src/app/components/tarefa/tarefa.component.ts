import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tarefa } from '../../entities/Tarefa';
import { TarefaService } from '../../services/tarefa.service';
import { ComentarioService } from '../../services/comentario.service';
import { Comentario } from '../../entities/Comentario';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrl: './tarefa.component.scss'
})
export class TarefaComponent implements OnInit {
  @Input() tarefa: Tarefa | null = null
  @Output() close = new EventEmitter<void>();
  @Output() closeAndEmitId = new EventEmitter<number>();
  comentarios: Comentario[] = []
  comentario: Comentario= {
    conteudo: '',
    comentadoEm: new Date().toISOString().split('.')[0],
  }
  iduser = localStorage.getItem('iduser')

  constructor(private tarefaService: TarefaService, private comentService: ComentarioService){

  }
  ngOnInit(): void {
    this.buscarComentarios()
  }
  buscarComentarios():void{
    this.comentService.findAllByTarefa(this.tarefa?.id as number)
    .subscribe((res)=> this.comentarios = res)
  }
  inserirComentario(){
    this.comentService.cadastrar(this.tarefa?.id as number, Number(this.iduser), this.comentario )
    .subscribe((res) => this.comentarios.unshift(res))
  }
  excluir(){
    this.tarefaService.apagar(this.tarefa?.id)
    .subscribe((res) => this.closeAndEmitId.emit(this.tarefa?.id),
  (err) => alert("Falha ao apagar tarefa."))
  }
  trataData(data: any): string{
    return new Date(data).toLocaleDateString()
  }
}

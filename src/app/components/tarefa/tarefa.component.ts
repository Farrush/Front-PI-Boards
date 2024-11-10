import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tarefa } from '../../entities/Tarefa';
import { TarefaService } from '../../services/tarefa.service';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrl: './tarefa.component.scss'
})
export class TarefaComponent {
  @Input() tarefa: Tarefa | null= null
  @Output() close = new EventEmitter<void>();
  @Output() closeAndEmitId = new EventEmitter<number>();

  constructor(private tarefaService: TarefaService){

  }

  excluir(){
    this.tarefaService.apagar(this.tarefa?.id)
    .subscribe((res) => this.closeAndEmitId.emit(this.tarefa?.id),
  (err) => alert("Falha ao apagar tarefa."))
  }
}

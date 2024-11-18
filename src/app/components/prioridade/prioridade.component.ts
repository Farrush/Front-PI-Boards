import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PrioridadeService } from '../../services/prioridade.service';
import { Prioridade } from '../../entities/Prioridade';

@Component({
  selector: 'app-prioridade',
  templateUrl: './prioridade.component.html',
  styleUrl: './prioridade.component.scss'
})
export class PrioridadeComponent implements OnInit{
  idProjeto = 0
  prioridades: Prioridade[] = []
  prioridade: Prioridade = {
    cor: '',
    prioridade: ''
  }
  @Output("fechar") fechar = new EventEmitter<void>()
  @Output("prioridade") selecionarPrioridade = new EventEmitter<Prioridade>()
  constructor(private router: Router, private service: PrioridadeService){
  }
  ngOnInit(): void {
    this.idProjeto = this.router.lastSuccessfulNavigation?.extras?.state?.["id"]
    this.buscarPrioridades()
  }
  buscarPrioridades(): void{
    this.service.findAllByProjeto(this.idProjeto)
    .subscribe((res)=> this.prioridades = res)
  }
  select(prioridade: Prioridade){
    this.selecionarPrioridade.emit(prioridade)
    this.fechar.emit()
  }
}

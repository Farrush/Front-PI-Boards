import { Component, EventEmitter, Output } from '@angular/core';
import { ProjetoService } from '../../services/projeto.service';
import { Projeto } from '../../entities/Projeto';

@Component({
  selector: 'app-form-projeto',
  templateUrl: './form-projeto.component.html',
  styleUrl: './form-projeto.component.scss'
})
export class FormProjetoComponent {

  constructor(private service: ProjetoService){

  }
  titulo = ''
  @Output("criarProjeto") criarProjeto = new EventEmitter<Projeto | null>()
  criar(): void{
    this.service.cadastrar(localStorage.getItem('iduser') as unknown as number, {
      titulo: this.titulo, 
      dataCriacao: new Date().toISOString().split('.')[0], 
      dataAlteracao: new Date().toISOString().split('.')[0]
    })
    .subscribe(
      (res)=>{
        this.criarProjeto.emit(res)
      },
      (err)=>{
        this.criarProjeto.emit(null)
      }
    )
    this.titulo = ''
  }
}

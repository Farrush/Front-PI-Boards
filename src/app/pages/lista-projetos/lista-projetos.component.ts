import { Component, OnInit } from '@angular/core';
import { ProjetoService } from '../../services/projeto.service';
import { Projeto } from '../../entities/Projeto';

@Component({
  selector: 'app-lista-projetos',
  templateUrl: './lista-projetos.component.html',
  styleUrl: './lista-projetos.component.scss'
})
export class ListaProjetosComponent implements OnInit{
  idUsuario = localStorage.getItem('iduser')
  projetos: Projeto[] = []
  projetosP: Projeto[] = []
  constructor(private projService: ProjetoService){

  }
  ngOnInit(): void {
    this.buscarProjetosCriados()
    this.buscarProjetosParticipados()
  }
  buscarProjetosCriados(): void{
    this.projService.findAllByCriador(this.idUsuario as unknown as number)
    .subscribe((res)=> {
      this.projetos = res 
    })
  }
  buscarProjetosParticipados(): void{
    this.projService.findAllByMembro(this.idUsuario as unknown as number)
    .subscribe((res)=> {
      this.projetosP = res 
    })
  }

}

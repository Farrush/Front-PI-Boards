import { Component, OnInit } from '@angular/core';
import { ProjetoService } from '../../services/projeto.service';
import { Projeto } from '../../entities/Projeto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-projetos',
  templateUrl: './lista-projetos.component.html',
  styleUrl: './lista-projetos.component.scss'
})
export class ListaProjetosComponent implements OnInit{
  idUsuario = localStorage.getItem('iduser')
  projetos: Projeto[] = []
  projetosP: Projeto[] = []
  showFormNewProject = false
  constructor(private projService: ProjetoService, private router: Router){

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

  abrirNovoProjeto(): void{
    this.showFormNewProject = true
  }
  addProjetoALista(projeto: Projeto | null){
    if(projeto == null)
      alert("Erro ao adicionar novo projeto")
    else{
      this.showFormNewProject = false
      this.projetos.push(projeto)
    }
  }
  verProjeto(id: number): void{
    this.router.navigate(['/projeto'],{state: {id}})
  }
  apagarProjeto(projeto: Projeto): void{
    this.projService.deletar(projeto.id as unknown as number)
    .subscribe(() => {
      if(projeto.id){
        this.projetos = this.projetos.filter(p => p.id !== projeto.id)

      }
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../entities/Usuario';

@Component({
  selector: 'app-area-perfil',
  templateUrl: './area-perfil.component.html',
  styleUrl: './area-perfil.component.scss'
})
export class AreaPerfilComponent implements OnInit{
  ID = localStorage.getItem('iduser')
  usuario: Usuario | null = null
  constructor(private userService: UsuarioService){

  }
  ngOnInit(): void {
    this.buscarUsuario()
  }
  buscarUsuario(): void{
    this.userService.findById(this.ID)
    .subscribe((res) => this.usuario = res)
  }
}

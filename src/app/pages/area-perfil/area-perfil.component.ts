import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../entities/Usuario';
import { Router } from '@angular/router';
@Component({
  selector: 'app-area-perfil',
  templateUrl: './area-perfil.component.html',
  styleUrl: './area-perfil.component.scss'
})
export class AreaPerfilComponent implements OnInit {
  pass: string = '';
  ID = localStorage.getItem('iduser')
  usuario: Usuario | null = null
  constructor(private userService: UsuarioService, private router: Router) {

  }
  ngOnInit(): void {
    this.buscarUsuario()
  }
  buscarUsuario(): void {
    this.userService.findById(this.ID)
      .subscribe((res) => this.usuario = res)
  }

  isFormValid(): boolean {
    return (this.pass != '')
  }
  onSubmit(): void {
    if (this.isFormValid()) {
      this.userService.atualizarSenha({
        senha: this.pass,
        email: ''
      }).subscribe(
        (res) => {
          alert("Senha alterada com sucesso!");
          this.router.navigate(['/login']);
        },
        (err) => {
          console.error('Erro ao alterar a senha:', err);
          alert('Erro ao alterar a senha.');
        }
      );
  } else {
    alert('Por favor, insira uma nova senha!');
  }
}
}

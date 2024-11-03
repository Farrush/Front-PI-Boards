import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../entities/Usuario';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  pass: string = '';
  isPasswordVisible: boolean = false;

  constructor(private service: UsuarioService,  private router: Router){

  }
  onSubmit() {
    if(this.email && this.pass)
      this.service.login({email: this.email, senha: this.pass})
      .subscribe((res) => {
        if(res.id != undefined)
          localStorage.setItem('iduser', res.id.toString())
        this.router.navigate(['/projeto'])
      },
      (err)=> {
        if(err.status == 401)
          alert("Email ou senha incorretos.")
      })
    else
      alert("Insira email e senha.")
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;

    // Animação
    const showPasswordIcon = document.getElementById('show-password');
    if (showPasswordIcon) {
      showPasswordIcon.classList.add('blinking');

      setTimeout(() => {
        showPasswordIcon.classList.remove('blinking');
      }, 1000);
    }
  }
}

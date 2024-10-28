import { Component } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {
  user: string = '';
  email: string = '';
  tel: string = '';
  pass: string = '';
  confirmPass: string = '';
  isPasswordVisible: boolean = false;
  isConfirmPasswordVisible: boolean = false;

  onSubmit() {
    if (this.isFormValid()) {
      alert('Registro bem-sucedido!');
      //lógica para enviar os dados ao servidor.
    }
  }

  isFormValid(): boolean {
    if (!this.user || !this.email || !this.tel || !this.pass) {
      alert('Por favor, preencha todos os campos.');
      return false;
    }

    if (this.pass !== this.confirmPass) {
      alert('As senhas não coincidem.');
      return false;
    }

    return true;
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.animateIcon('show-password');
  }

  toggleConfirmPasswordVisibility() {
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
    this.animateIcon('show-confirm-password');
  }

  private animateIcon(iconId: string) {
    const showPasswordIcon = document.getElementById(iconId);
    if (showPasswordIcon) {
      showPasswordIcon.classList.add('blinking');

      setTimeout(() => {
        showPasswordIcon.classList.remove('blinking');
      }, 1000);
    }
  }
}
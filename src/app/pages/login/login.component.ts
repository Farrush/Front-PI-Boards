import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user: string = '';
  pass: string = '';
  isPasswordVisible: boolean = false;

  onSubmit() {
    console.log('Username:', this.user);
    console.log('Password:', this.pass);
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

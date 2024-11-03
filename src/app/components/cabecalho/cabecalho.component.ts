import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.scss'
})
export class CabecalhoComponent {
  constructor(private router: Router){

  }
  irParaListaProjetos(): void{
    if(this.router.url != '/projetos'){
      this.router.navigate(['/projetos'])
    }
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import env from '../enviroments/enviroment';
import { Observable } from 'rxjs';
import { Usuario } from '../entities/Usuario'

@Injectable({
  providedIn: 'root'
})
export class MembroProjetoService {
  url = env.url+"membro"
  constructor(private http: HttpClient) { }
}

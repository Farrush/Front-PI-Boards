import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import env from '../enviroments/enviroment';
import { Observable } from 'rxjs';
import { Usuario } from '../entities/Usuario'

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  url = env.url+"comentario"
  constructor(private http: HttpClient) { }
}

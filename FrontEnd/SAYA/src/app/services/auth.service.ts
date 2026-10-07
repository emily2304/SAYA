import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Enviroments } from '../enviroments/enviroments';
import { User } from '../interfaces/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string =  Enviroments.apiUrl;

  constructor(private httpClient: HttpClient) { }


  login(email: string, password: string): Observable<User> {
    const body = { email, password };

    return this.httpClient.post<User>(`${this.apiUrl}/users/login`, body, {
      withCredentials: true
    }).pipe(
      // tap se usa para efectos secundarios: guardar el rol
      tap((user) => {
        if (user.rol) {
          localStorage.setItem('auth_rol', user.rol);
        }
        if (user._id) {
          localStorage.setItem('userId', user._id);
        }
      }),
      // catchError para manejar errores
      catchError(err => {
        console.error('Login error:', err);
        return throwError(() => err);
      })
    );
  }

  // auth.service.ts
  register(user: {
    nombre: string;
    email: string;
    password: string;
    rol: 'alumno' | 'profe';
  }): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/users`, user, {
      withCredentials: true
    }).pipe(
      catchError(err => {
        console.error('Register error:', err);
        return throwError(() => err);
      })
    );
  }

  getUserId(): string {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      throw new Error('Usuario no autenticado');
    }
    return userId;
  }


  getUserRole(): string | null {
    return localStorage.getItem('auth_rol');
  }

}

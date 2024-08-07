import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(this.getStoredUser());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private getStoredUser(): any {
    if (typeof localStorage !== 'undefined') {
      const storedUser = localStorage.getItem('currentUser');
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }
  
  login(username: string, password: string) {
    return this.http.post<any>(`http://localhost:5201/api/auth/login`, { username, passwordHash: password })
      .pipe(map(user => {
        // almacenar detalles del usuario y token jwt en el almacenamiento local para mantener al usuario conectado entre las actualizaciones de la página
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    // eliminar usuario del almacenamiento local para cerrar la sesión del usuario
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getAuthHeaders() {
    const currentUser = this.getStoredUser();
    const token = currentUser?.token; // Ajusta esto según cómo se almacena el token
    return token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : new HttpHeaders();
  }
}
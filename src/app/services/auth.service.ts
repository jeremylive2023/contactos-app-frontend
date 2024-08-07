import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private apiUrl = '/api/auth'; // Asegúrate de que esta URL coincida con tu backend

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
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password })
      .pipe(map(response => {
        const user = { username, token: response.token };
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  register(user: User) {
    return this.http.post(`${this.apiUrl}/register`, user);
  }
}
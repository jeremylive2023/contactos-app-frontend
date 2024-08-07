import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:5201/api/contacts';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    return this.authService.getAuthHeaders();
  }

  getContacts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getContact(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  createContact(contact: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, contact, { headers: this.getHeaders() });
  }

  updateContact(id: number, contact: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, contact, { headers: this.getHeaders() });
  }

  deleteContact(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}

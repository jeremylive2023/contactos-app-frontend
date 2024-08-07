import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = '/api/contacts';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.currentUserValue?.token;
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getContact(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl, contact, { headers: this.getHeaders() });
  }

  updateContact(contact: Contact): Observable<any> {
    return this.http.put(`${this.apiUrl}/${contact.id}`, contact, { headers: this.getHeaders() });
  }

  deleteContact(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
} 
import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule, MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule]
})
export class ContactListComponent implements OnInit {
  contacts: any[] = [];

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.loadContacts();
  }

  loadContacts() {
    this.contactService.getContacts().subscribe(
      (data) => {
        this.contacts = data;
      },
      (error) => {
        console.error('Error fetching contacts', error);
      }
    );
  }

  deleteContact(id: number) {
    this.contactService.deleteContact(id).subscribe(
      () => {
        this.loadContacts();
      },
      (error) => {
        console.error('Error deleting contact', error);
      }
    );
  }
}
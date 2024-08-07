import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(private contactService: ContactService, private router: Router) { }

  ngOnInit() {
    this.loadContacts();
  }

  loadContacts() {
    this.contactService.getContacts().subscribe(
      contacts => this.contacts = contacts,
      error => console.error('Error loading contacts', error)
    );
  }

  addNewContact() {
    this.router.navigate(['/contacts/new']);
  }

  editContact(id: number | undefined) {
    if (id !== undefined) {
      this.router.navigate(['/contacts/edit', id]);
    } else {
      console.error('Contact ID is undefined');
    }
  }

  deleteContact(id: number) {
    this.contactService.deleteContact(id).subscribe(
      () => {
        this.contacts = this.contacts.filter(contact => contact.id !== id);
      },
      error => console.error('Error deleting contact', error)
    );
  }
}
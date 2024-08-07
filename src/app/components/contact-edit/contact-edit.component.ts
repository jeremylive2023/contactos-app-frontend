import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class ContactEditComponent implements OnInit {
  contact: Contact = {
    name: 'Jeremy', phoneNumber: '88888',
    id: 1,
    userId: '1'
  };
  isNewContact: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isNewContact = false;
      this.loadContact(+id);
    }
  }

  loadContact(id: number) {
    this.contactService.getContact(id).subscribe(
      contact => this.contact = contact,
      error => console.error('Error loading contact', error)
    );
  }

  onSubmit() {
    if (this.isNewContact) {
      this.contactService.addContact(this.contact).subscribe(
        () => this.router.navigate(['/contacts']),
        error => console.error('Error adding contact', error)
      );
    } else {
      this.contactService.updateContact(this.contact).subscribe(
        () => this.router.navigate(['/contacts']),
        error => console.error('Error updating contact', error)
      );
    }
  }

  cancel() {
    this.router.navigate(['/contacts']);
  }
}
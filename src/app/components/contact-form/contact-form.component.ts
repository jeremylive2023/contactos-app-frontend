import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule
  ]
})
export class ContactFormComponent implements OnInit {
  contact: any = {
    name: '',
    phoneNumber: ''
  };
  isEditMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadContact(+id);
    }
  }

  loadContact(id: number) {
    this.contactService.getContact(id).subscribe(
      (data) => {
        this.contact = data;
      },
      (error) => {
        console.error('Error fetching contact', error);
      }
    );
  }

  onSubmit() {
    if (this.isEditMode) {
      this.updateContact();
    } else {
      this.createContact();
    }
  }

  createContact() {
    this.contactService.createContact(this.contact).subscribe(
      () => {
        this.router.navigate(['/contacts']);
      },
      (error) => {
        console.error('Error creating contact', error);
      }
    );
  }

  updateContact() {
    this.contactService.updateContact(this.contact.id, this.contact).subscribe(
      () => {
        this.router.navigate(['/contacts']);
      },
      (error) => {
        console.error('Error updating contact', error);
      }
    );
  }
}

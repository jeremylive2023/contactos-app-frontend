import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { AuthGuard } from './guards/auth.guard';
import { ContactFormComponent } from './components/contact-form/contact-form.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'contacts', component: ContactListComponent, canActivate: [AuthGuard] },
  { path: 'contacts/new', component: ContactFormComponent, canActivate: [AuthGuard] },
  { path: 'contacts/edit/:id', component: ContactFormComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/contacts', pathMatch: 'full' },
];
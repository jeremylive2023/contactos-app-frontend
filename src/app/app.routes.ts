import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactEditComponent } from './components/contact-edit/contact-edit.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'contacts', component: ContactListComponent, canActivate: [AuthGuard] },
  { path: 'contacts/new', component: ContactEditComponent, canActivate: [AuthGuard] },
  { path: 'contacts/edit/:id', component: ContactEditComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/contacts', pathMatch: 'full' },
  { path: '**', redirectTo: '/contacts' }
];
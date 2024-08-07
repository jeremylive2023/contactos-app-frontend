import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { 
    path: 'login', 
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  { 
    path: 'contacts', 
    loadComponent: () => import('./components/contact-list/contact-list.component').then(m => m.ContactListComponent),
    canActivate: [AuthGuard] 
  },
  { 
    path: 'contacts/new', 
    loadComponent: () => import('./components/contact-edit/contact-edit.component').then(m => m.ContactEditComponent),
    canActivate: [AuthGuard] 
  },
  { 
    path: 'contacts/edit/:id', 
    loadComponent: () => import('./components/contact-edit/contact-edit.component').then(m => m.ContactEditComponent),
    canActivate: [AuthGuard] 
  },
  { path: '', redirectTo: '/contacts', pathMatch: 'full' },
  { path: '**', redirectTo: '/contacts' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
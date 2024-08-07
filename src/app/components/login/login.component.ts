import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule]
})

export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  onSubmit() {
    this.authService.login(this.username, this.password)
      .subscribe(
        response => {
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.router.navigate(['/contacts']);
        },
        error => {
          this.error = 'Invalid username or password';
        }
      );
  }
}
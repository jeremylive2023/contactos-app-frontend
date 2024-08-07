import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterModule]
})
export class AppComponent {
  constructor(
    private router: Router,
    public authService: AuthService
  ) { }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

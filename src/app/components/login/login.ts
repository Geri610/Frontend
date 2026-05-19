import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-anmeldung',
  templateUrl: './login.html',
  imports: [FormsModule],
  styleUrls: ['./login.css']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.errorMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'Bitte E-Mail und Passwort eingeben.';
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.router.navigate(['/items']);
      },
      error: (err) => {
        this.errorMessage = 'Ungültige E-Mail-Adresse oder falsches Passwort.';
        console.error('Login Fehler:', err);
      }
    });
  }
}
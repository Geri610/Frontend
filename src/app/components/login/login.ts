import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms'; // <-- Importieren

@Component({
  selector: 'app-anmeldung',
  templateUrl: './login.html',
  imports: [FormsModule]
  //styleUrls: ['./anmeldung.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.errorMessage = ''; // Fehler zurücksetzen

    if (!this.email || !this.password) {
      this.errorMessage = 'Bitte E-Mail und Passwort eingeben.';
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        // Login erfolgreich -> Weiterleitung zu Items
        this.router.navigate(['/items']);
      },
      error: (err) => {
        // Fehler vom Backend abfangen (z.B. 401 Unauthorized)
        this.errorMessage = 'Ungültige E-Mail-Adresse oder falsches Passwort.';
        console.error('Login Fehler:', err);
      }
    });
  }
}
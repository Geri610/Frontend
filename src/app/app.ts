import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common'; // <-- WICHTIG für den modern Control Flow mit Observables
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from './services/auth.service'; // Pfad anpassen

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, AsyncPipe], // <-- AsyncPipe hier eintragen
  templateUrl: './app.html',
  //styleUrls: ['./app.css']
})
export class AppComponent {
  // Durch das 'public' Schlüsselwort ist 'auth' direkt im HTML-Template oben verfügbar
  constructor(public auth: AuthService) {} 
}
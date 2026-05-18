import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/customer/login'; // Passe die URL an dein Backend an
  
  // Die "globale Variable": Speichert die ID des eingeloggten Users (null = nicht eingeloggt)
  private currentCustomerIdSubject = new BehaviorSubject<number | null>(null);
  
  // Observable, das Komponenten abonnieren können
  public currentCustomerId$ = this.currentCustomerIdSubject.asObservable();

  constructor(private http: HttpClient) {}

login(email: string, password: string): Observable<any> {
  console.log('1. login() im Service gestartet mit:', email);
  
  return this.http.post(this.apiUrl, { email, password }, { responseType: 'text' }).pipe(
    tap(rawId => {
      console.log('2. Server-Antwort im tap angekommen. Inhalt:', rawId);
      
      if (rawId) {
        const userId = Number(rawId);
        console.log('3. ID erfolgreich umgewandelt zu Zahl:', userId);
        
        this.currentCustomerIdSubject.next(userId);
        console.log('4. BehaviorSubject befeuert. Aktueller Wert im Service:', this.getCustomerId());
      } else {
        console.warn('WARNUNG: Server antwortete mit 200 OK, aber die ID war leer/null!');
      }
    })
  );
}

  // Hilfsmethode, um die ID direkt im Code abzufragen (ohne Observable)
  getCustomerId(): number | null {
    return this.currentCustomerIdSubject.value;
  }

  logout(): void {
    this.currentCustomerIdSubject.next(null);
  }
}
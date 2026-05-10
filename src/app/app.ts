import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { OAuthService, UrlHelperService, OAuthLogger } from 'angular-oauth2-oidc';
import { AuthenticationService } from './services/authentication';
import { HttpClient } from '@angular/common/http';
import { environment } from './environment/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  providers: [OAuthService, AuthenticationService],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('DeliFHery');

  constructor(
    public auth: AuthenticationService,
    private http: HttpClient
  ) {}

  private CompleteLogin() {
    if (!this.auth.isLoggedIn()) {
      console.log("Login nicht erfolgt");
      return;
    }

    console.log("Login erfolgreich");

    // Init-API Call nach dem Login (Init-Controller im Backend)
    this.http.get<any>(environment.api + '/init').subscribe({
      next: (res) => {
        console.log("Init-Return", res);
      },
      error: (err) => {
        console.error("Init nicht erfolgreich:", err);
      }
    });
  }
}

import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { authConfig } from './auth.config';
import { OAuthService, UrlHelperService, OAuthLogger } from 'angular-oauth2-oidc';
import { AuthenticationService } from './services/authentication';
import { HttpClient } from '@angular/common/http';
import { environment } from './environment/environment';
import { SessionService } from './services/session.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  providers: [OAuthService, AuthenticationService, SessionService],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('DeliFHery');

  constructor(
    private oauthService: OAuthService,
    public auth: AuthenticationService,
    private http: HttpClient,
    private session: SessionService
  ) {
    this.oauthService.configure(authConfig);

    this.oauthService.loadDiscoveryDocumentAndTryLogin()
      .then(() => this.afterLogin());
  }

  private afterLogin() {
    console.log("TryLogin abgeschlossen");

    if (!this.auth.isLoggedIn()) {
      console.log("Nicht eingeloggt – Login-Flow wird später getriggert.");
      return;
    }

    console.log("Login abgeschlossen → Tokens vorhanden");

    // Init-API Call nach Login
    this.http.get<any>(environment.api + '/init').subscribe({
      next: (res) => {
        console.log("Init-Result:", res);

        if (res?.userId) {
          this.session.customerId = res.userId;
          console.log("Customer set:", this.session.customerId);
        }
      },
      error: (err) => {
        console.error("Init-Fehler:", err);
      }
    });
  }
}

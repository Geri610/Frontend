import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly http = inject(HttpClient);
  private baseUrl = `${environment.api}/Notification`;

  private errorHandler(error: any): Observable<any> {
    console.error('NotificationService API-Fehler:', error);
    return of(null);
  }

  public AktivateNotification(trackingId: string, zip: number) {
    return this.http.post(
      `${this.baseUrl}`,
      { trackingId, zip }
    );
  }

  public DeaktivateNotification(trackingId: string, zip: number) {
    return this.http.delete(
      `${this.baseUrl}`,
      { body: { trackingId, zip } }
    );
  }

}

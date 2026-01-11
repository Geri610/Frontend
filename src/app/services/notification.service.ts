import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly http = inject(HttpClient);
  private baseUrl = `${environment.api}/Notification`;

  private errorHandler(error: any): Observable<any> {
    console.error('Notification-Service API-Error:', error);
    return of(null);
  }

  public SubscribeToNotifications(trackingId: string, zip: number) {
    return this.http.post(
      `${this.baseUrl}`,
      { trackingId, zip }
    );
  }

  public CancelNotifications(trackingId: string, zip: number) {
    return this.http.delete(
      `${this.baseUrl}`,
      { body: { trackingId, zip } }
    );
  }

}

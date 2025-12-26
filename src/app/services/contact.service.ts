import { inject, Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Contact } from '../shared/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private readonly http = inject(HttpClient);

  private errorHandler(error: any): Observable<any> {
    console.error('ContactService API-Fehler:', error);
    return of(null);
  }

  private baseUrl = `${environment.api}/contact`;

  // GET api/contact/{contactID}
  getById(contactId: number): Observable<Contact | null> {
    return this.http
      .get<Contact>(`${this.baseUrl}/${contactId}`)
      .pipe(catchError(this.errorHandler));
  }

  // POST api/contact
  create(contact: Contact): Observable<Contact | null> {
    return this.http
      .post<Contact>(this.baseUrl, contact)
      .pipe(catchError(this.errorHandler));
  }

  // PUT api/contact/{contactID}
  update(contactId: number, contact: Contact): Observable<Contact | null> {
    return this.http
      .put<Contact>(`${this.baseUrl}`, contact)
      .pipe(catchError(this.errorHandler));
  }

  // DELETE api/contact/{contactID}
  delete(contactId: number): Observable<boolean> {
    return this.http
      .delete<boolean>(`${this.baseUrl}/${contactId}`)
      .pipe(catchError(this.errorHandler));
  }

  // GET api/customer/contact
  getAllForCustomer(): Observable<Contact[] | null> {
    return this.http
      .get<Contact[]>(`${environment.api}/customer/contact`)
      .pipe(catchError(this.errorHandler));
  }
}
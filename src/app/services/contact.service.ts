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
    console.error('Contact-Service API-Error:', error);
    return of(null);
  }

  private baseUrl = `${environment.api}/contact`;

  // GET api/contact/{contactID}
  getContactById(contactId: number): Observable<Contact | null> {
    return this.http
      .get<Contact>(`${this.baseUrl}/${contactId}`)
      .pipe(catchError(this.errorHandler));
  }

  // POST api/contact
  createContact(contact: Contact): Observable<Contact | null> {
    return this.http
      .post<Contact>(this.baseUrl, contact)
      .pipe(catchError(this.errorHandler));
  }

  // PUT api/contact/{contactID}
  updateContact(contactId: number, contact: Contact): Observable<Contact | null> {
    return this.http
      .put<Contact>(`${this.baseUrl}`, contact)
      .pipe(catchError(this.errorHandler));
  }

  // DELETE api/contact/{contactID}
  deleteContact(contactId: number): Observable<boolean> {
    return this.http
      .delete<boolean>(`${this.baseUrl}/${contactId}`)
      .pipe(catchError(this.errorHandler));
  }

  // GET api/customer/contact
  getAllContactsForCustomer(): Observable<Contact[] | null> {
    return this.http
      .get<Contact[]>(`${environment.api}/customer/contact`)
      .pipe(catchError(this.errorHandler));
  }
}
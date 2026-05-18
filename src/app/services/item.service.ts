import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Item } from '../shared/item';

@Injectable({
  providedIn: 'root',
})
export class ItemService {

  private readonly http = inject(HttpClient);
  private apiUrl = `http://localhost:8080/item`;

  private errorHandler(error: any): Observable<any> {
    console.error('Item-Service API Error:', error);
    return of(null);
  }

/** Holt ein einzelnes Item anhand der ID */
  getItemById(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/${id}`);
  }

  /** Erstellt ein neues Item */
  createItem(itemDto: Item): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, itemDto);
  }

  /** Aktualisiert ein bestehendes Item */
  updateItem(id: number, itemDto: Item): Observable<Item> {
    return this.http.put<Item>(`${this.apiUrl}/${id}`, itemDto);
  }

  /** Löscht ein Item */
  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /** Holt die beliebtesten Items */
  getMostPopularItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiUrl}/popular`);
  }

  /** Sucht nach Items via Query-Parameter */
  searchItems(searchString: string): Observable<Item[]> {
    // Erzeugt ?searchString=...
    const params = new HttpParams().set('searchString', searchString);
    return this.http.get<Item[]>(`${this.apiUrl}/search`, { params });
  }
}

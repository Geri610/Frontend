import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {  ItemDto } from '../shared/ItemDto';

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

  getItemById(id: number): Observable<ItemDto> {
    return this.http.get<ItemDto>(`${this.apiUrl}/${id}`);
  }

  createItem(itemDto: ItemDto): Observable<ItemDto> {
    return this.http.post<ItemDto>(this.apiUrl, itemDto);
  }

  updateItem(id: number, itemDto: ItemDto): Observable<ItemDto> {
    return this.http.put<ItemDto>(`${this.apiUrl}/${id}`, itemDto);
  }

  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getMostPopularItems(): Observable<ItemDto[]> {
    return this.http.get<ItemDto[]>(`${this.apiUrl}/popular`);
  }

  searchItems(searchString: string): Observable<ItemDto[]> {.
    const params = new HttpParams().set('searchString', searchString);
    return this.http.get<ItemDto[]>(`${this.apiUrl}/search`, { params });
  }
}

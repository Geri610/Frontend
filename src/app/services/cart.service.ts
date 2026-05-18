import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartDto } from '../shared/CartDto';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:8080/cart';

  constructor(private http: HttpClient) {}

  // GET /cart/{userId}
  getCart(userId: number): Observable<CartDto> {
    return this.http.get<CartDto>(`${this.apiUrl}/${userId}`);
  }

  // POST /cart/add?customerId=X&itemId=Y
  addItemToCart(customerId: number, itemId: number): Observable<void> {
    console.log('added item id:', itemId);
    const params = new HttpParams()
      .set('customerId', customerId.toString())
      .set('itemId', itemId.toString());
    return this.http.post<void>(`${this.apiUrl}/add`, null, { params });
  }

  // DELETE /cart?customerId=X&itemId=Y
  removeItemFromCart(customerId: number, itemId: number): Observable<void> {
    const params = new HttpParams()
      .set('customerId', customerId.toString())
      .set('itemId', itemId.toString());
    return this.http.delete<void>(this.apiUrl, { params });
  }
}
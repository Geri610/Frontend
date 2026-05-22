import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartDto } from '../shared/CartDto';
import { CustomerDto } from '../shared/CustomerDto';
import { PaymentMethodDto } from '../shared/PaymentMethodDto';
import { OrderDto } from '../shared/OrderDto';
import { CartItemDto } from '../shared/CartItemDto';

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
  addItemToCart(customerId: number, itemId: number): Observable<CartItemDto> {
    console.log('added item id:', itemId);
    const params = new HttpParams()
      .set('customerId', customerId.toString())
      .set('itemId', itemId.toString());
    return this.http.post<CartItemDto>(`${this.apiUrl}/add`, null, { params });
  }

  // DELETE /cart?customerId=X&itemId=Y
  removeItemFromCart(customerId: number, itemId: number): Observable<void> {
    const params = new HttpParams()
      .set('customerId', customerId.toString())
      .set('itemId', itemId.toString());
    return this.http.delete<void>(this.apiUrl, { params });
  }

  // Get Customer
  getCustomerForId(customerId: number): Observable<CustomerDto> {
    return this.http.get<CustomerDto>(`http://localhost:8080/customer/${customerId}`);
  }

  
  // Get PaymentMethods
  getPaymentMethods(): Observable<PaymentMethodDto[]> {
    return this.http.get<PaymentMethodDto[]>('http://localhost:8080/cart/paymentMethods');
  }

  checkOutCart(customerId: number, paymentId: number): Observable<OrderDto> {
    const params = new HttpParams().set('paymentId', paymentId.toString());
    return this.http.post<OrderDto>(
      `${this.apiUrl}/checkout/${customerId}`, 
      null, 
      { params }
    );
  }
}
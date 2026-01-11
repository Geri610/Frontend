import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '../environment/environment';
import { Shipment } from '../shared/shipment';

@Injectable({
  providedIn: 'root',
})
export class ShipmentService {

  private readonly http = inject(HttpClient);
  private baseUrl = `${environment.api}/shipment`;

  private errorHandler(error: any): Observable<any> {
    console.error('Shipment-Service API Error:', error);
    return of(null);
  }

  getShipmentByTrackingIdAndZip(trackingId: string, zip: number): Observable<Shipment> {
    return this.http.get<Shipment>(`${this.baseUrl}/${trackingId}/${zip}`)
      .pipe(catchError(this.errorHandler));
  }

  createShipment(newShipment: any): Observable<Shipment> {
    return this.http.post<Shipment>(this.baseUrl, newShipment)
      .pipe(catchError(this.errorHandler));
  }

  getAllShipmentsForCustomer(): Observable<Shipment[]> {
    return this.http.get<Shipment[]>(`${this.baseUrl}`)
      .pipe(catchError(this.errorHandler));
  }

  getLabelForShipment(shipmentId:number): Observable<Blob> {
    const url = `${this.baseUrl}/${shipmentId}/barcode`;
    return this.http.get(url, { responseType: 'blob' }); // Antwort als Blob für Bilddatei
  }

  getPriceForShipment(newShipment: Shipment): Observable<number> {
    return this.http
      .post<number>(`${this.baseUrl}/price/`, newShipment)
      .pipe(catchError(this.errorHandler));
  }
}

import { Component } from '@angular/core';
import { ShipmentService } from '../../services/shipment.service';

@Component({
  selector: 'app-label',
  imports: [],
  templateUrl: './label.html',
  styles: ``,
})
export class Label {

  barcodeUrl: string | null = null;
  constructor(private shipmentService: ShipmentService){}
  shipmentId:number=0;
  trackingId:string="";

loadShipmentData(): void {
    const pendingShipment = localStorage.getItem('pendingShipment');
    if (pendingShipment) {
      const shipmentData = JSON.parse(pendingShipment);

      // Daten aus dem localStorage extrahieren
      if(shipmentData.Id !== null)
        this.shipmentId = shipmentData.Id;
      if(shipmentData.trackingId !== null)
        this.trackingId = shipmentData.trackingId;
      console.log('Shipment ID:', this.shipmentId);
      console.log('Tracking ID:', this.trackingId);

    } else {
      console.log('No pending shipment data found');
    }
  }

  ngOnInit(): void {
    // Abrufen der Shipment-Daten aus dem localStorage
    this.shipmentId = 4163;
    this.loadShipmentData();
    this.getBarcode(this.shipmentId);
  }

  getBarcode(shipmentId: number): void {
    this.shipmentService.getLabelForShipment(shipmentId).subscribe({
      next: (response: Blob) => {
        // Erstellen einer URL für das Bild
        const imageUrl = URL.createObjectURL(response);
        this.barcodeUrl = imageUrl;
      },
      error: (err) => {
        console.error('Fehler beim Abrufen des Barcodes:', err);
      },
    });
  }
}

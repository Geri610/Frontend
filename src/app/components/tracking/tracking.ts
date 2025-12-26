import { Component } from '@angular/core';
import { Shipment } from '../../shared/shipment';
import { ShipmentService } from '../../services/shipment.service';
import { ShipmentStatusEntry } from '../../shared/shipment-status-entry';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tracking',
  imports: [FormsModule],
  templateUrl: './tracking.html',
  styles: ``,
})
export class Tracking {

trackedShipment: Shipment = new Shipment();
  errorMessage: string | null = null;
  result: Shipment | null = null;
  history: ShipmentStatusEntry[] = [];

  dummyShipments: Shipment[] = [];

  constructor(
    private shipmentService: ShipmentService,
  ) { }

  checkStatus() {
    this.errorMessage = null;
    this.result = null;
    this.history = [];

    // 1) Validierung
    if (!this.trackedShipment.trackingId) {
      this.errorMessage = "Bitte Trackingnummer eingeben";
      return;
    }

    if (!this.trackedShipment.receiverAddress?.zip) {
      this.errorMessage = "Bitte PLZ eingeben";
      return;
    }

    const trackingId = this.trackedShipment.trackingId;
    const zip = Number(this.trackedShipment.receiverAddress.zip);

    // 2) Backend-Request
    this.shipmentService
      .getByTrackingIdAndZip(trackingId, zip)
      .subscribe(result => {
        if (!result) {
          this.errorMessage = "Sendung nicht gefunden";
          return;
        }

        // 3) Backend-Daten übernehmen
        this.result = result;
        this.history = result.history ?? [];
      });
  }
}

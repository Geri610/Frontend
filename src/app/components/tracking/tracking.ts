import { Component } from '@angular/core';
import { Shipment } from '../../shared/shipment';
import { ShipmentService } from '../../services/shipment.service';
import { ShipmentStatusEntry } from '../../shared/shipment-status-entry';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tracking',
  imports: [FormsModule],
  templateUrl: './tracking.html',
  styles: ``,
})
export class Tracking {

  targetedShipment: Shipment = new Shipment();
  errorMessage: string | null = null;
  result: Shipment | null = null;
  history: ShipmentStatusEntry[] = [];

  constructor(
    private shipmentService: ShipmentService,
  ) { }

  checkStatus() {
    this.errorMessage = null;
    this.result = null;
    this.history = [];

    if (!this.targetedShipment.trackingId) {
      this.errorMessage = "Trackingnummer eingeben";
      return;
    }

    if (!this.targetedShipment.receiverAddress?.zip) {
      this.errorMessage = "PLZ eingeben";
      return;
    }

    const trackingId = this.targetedShipment.trackingId;
    const zip = Number(this.targetedShipment.receiverAddress.zip);

    this.shipmentService
      .getShipmentByTrackingIdAndZip(trackingId, zip)
      .subscribe(result => {
        if (!result) {
          this.errorMessage = "Shipment nicht gefunden";
          return;
        }

        this.result = result;
        this.history = result.history ?? [];
      });
  }
}

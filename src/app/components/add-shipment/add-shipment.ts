import { Component } from '@angular/core';
import { Address } from '../../shared/address';
import { Parcel } from '../../shared/parcel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Shipment } from '../../shared/shipment';
import { ShipmentService } from '../../services/shipment.service';

@Component({
  selector: 'add-shipment',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './add-shipment.html',
})
export class AddShipment {

  newShipment: Shipment | null = null;
  sender: Address = new Address();
  receiver: Address = new Address();
  parcel: Parcel = new Parcel(1,1,1,1);
  errorMessage: string | null = null;

  constructor(private shipmentService: ShipmentService) { }

  addShipment() {
    this.errorMessage = null;

    if (!this.sender.addressIsComplete() ||
      !this.receiver.addressIsComplete() ||
      !this.parcel.parcelIsComplete()) {
      this.errorMessage = "Alle Felder ausfüllen";
      return;
    }

    const body = {
      senderAddress: this.sender,
      receiverAddress: this.receiver,
      parcel: this.parcel,
      url: "http://localhost:4200/label/"
    };

    this.shipmentService.createShipment(body as any).subscribe({
      next: (res) => {
        this.newShipment = res as Shipment;

        localStorage.setItem("pendingShipment", JSON.stringify({
          Id: this.newShipment.id,
          trackingId: this.newShipment.trackingId,
          zip: this.newShipment.receiverAddress.zip
        }));

        if (this.newShipment.url) {
          window.location.href = this.newShipment.url;
        }
      },
      error: () => {
        this.errorMessage = "Shipment nicht erstellt";
      }
    });
  }

  resetForm() {
      this.sender = new Address();
      this.receiver = new Address();
      this.parcel = new Parcel(10,10,10,10);
      this.errorMessage = null;
      this.newShipment = null;
  }
}

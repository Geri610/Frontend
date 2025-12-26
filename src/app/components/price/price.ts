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
  templateUrl: './price.html',
})
export class Price {
  price: number | null = null;
  errorMessage: string | null = null;

  newShipment: Shipment | null = null;
  sender: Address = new Address();
  receiver: Address = new Address();
  parcel: Parcel = new Parcel();

  constructor(private shipmentService: ShipmentService) { }

  submitShipment() {
    this.errorMessage = null;

    // Eingabevalidierung
    if (!this.sender.addressIsComplete() ||
      !this.receiver.addressIsComplete() ||
      !this.parcel.parcelIsComplete()) {
      this.errorMessage = "Bitte alle Felder richtig ausfüllen";
      return;
    }

    // Request-Body für Backend 
    const body = {
      senderAddress: this.sender,
      receiverAddress: this.receiver,
      parcel: this.parcel,
    };

    // POST an Backend
    this.shipmentService.getPrice(body as any).subscribe(result => {
      if (result === null) {
        this.errorMessage = "Preisberechnung fehlgeschlagen.";
        return;
      }
      console.log("result:", result);
      this.price = result;
    });
  }

  resetForm() {
      this.sender = new Address();
      this.receiver = new Address();
      this.parcel = new Parcel();
      this.errorMessage = null;
      this.newShipment = null;
      this.price = null;
  }
}

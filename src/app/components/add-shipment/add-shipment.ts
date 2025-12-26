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
  parcel: Parcel = new Parcel();
  errorMessage: string | null = null;

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
      url: "http://localhost:4200/label/"
    };

    // POST an Backend
    this.shipmentService.create(body as any).subscribe({
      next: (res) => {
        this.newShipment = res as Shipment;

        // alles speichern, was ich nach dem Redirect brauche
        localStorage.setItem("pendingShipment", JSON.stringify({
          Id: this.newShipment.id,
          trackingId: this.newShipment.trackingId,
          zip: this.newShipment.receiverAddress.zip
        }));

        // Weiter zur Bezahlseite
        if (this.newShipment.url) {
          window.location.href = this.newShipment.url;
        }
      },
      error: () => {
        this.errorMessage = "Fehler beim Anlegen der Sendung.";
      }
    });
  }

  resetForm() {
      this.sender = new Address();
      this.receiver = new Address();
      this.parcel = new Parcel();
      this.errorMessage = null;
      this.newShipment = null;
  }
}

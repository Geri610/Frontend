import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Shipment } from '../../shared/shipment';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  imports: [CommonModule, FormsModule],
  templateUrl: './notification.html'
})
export class Notification {
  trackedShipment: Shipment = new Shipment();
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private notificationService: NotificationService,
  ) { this.trackedShipment.receiverAddress.zip = undefined; };


  private validateInput(): { trackingId: string; zip: number; } | null {
    this.errorMessage = null;
    this.successMessage = null;

    if (!this.trackedShipment.trackingId?.trim()) {
      this.errorMessage = "Bitte Trackingnummer eingeben";
      return null;
    }

    if (!this.trackedShipment.receiverAddress?.zip) {
      this.errorMessage = "Bitte PLZ eingeben";
      return null;
    }

    return {
      trackingId: this.trackedShipment.trackingId.trim(),
      zip: Number(this.trackedShipment.receiverAddress.zip),

    };
  }

  trackingActivate() {
    const data = this.validateInput();
    if (!data) return;

    this.notificationService.AktivateNotification(data.trackingId, data.zip)
      .subscribe({
        next: () => {
          this.successMessage = "Benachrichtigungen aktiviert.";
        },
        error: () => {
          this.errorMessage = "Konnte Benachrichtigungen nicht aktivieren.";
        }
      });
  }

  trackingDeactivate() {
    const data = this.validateInput();
    if (!data) return;

    this.notificationService.DeaktivateNotification(data.trackingId, data.zip)
      .subscribe({
        next: () => {
          this.successMessage = "Benachrichtigungen deaktiviert.";
        },
        error: () => {
          this.errorMessage = "Konnte Benachrichtigungen nicht deaktivieren.";
        }
      });

  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart } from 'chart.js/auto';

import { Shipment } from '../shared/shipment';
import { ShipmentStatusEntry } from '../shared/shipment-status-entry';
import { ShipmentService } from '../services/shipment.service';
// import { SessionService } from '../services/session.service';

@Component({
  selector: 'Stats',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stats.html'
})
export class StatisticsComponent implements OnInit {

  allShipments: Shipment[] = [];
  timeFilter: 'week' | 'month' | 'year' = 'week';

  private chartInstance?: Chart;

  constructor(
    private shipmentApi: ShipmentService,
    // private session: SessionService
  ) {}

  ngOnInit(): void {
    this.loadShipments();
  }

  // -----------------------------
  // Daten laden
  // -----------------------------
  private loadShipments(): void {
    this.shipmentApi.getAllByCustomer().subscribe(data => {
      if (!data) return;

      this.allShipments = data;
      this.updateChart();
    });
  }

  // -----------------------------
  // Zeitfilter anwenden
  // -----------------------------
  private shipmentsInRange(): Shipment[] {
    const limitDate = this.calculateLimitDate();

    return this.allShipments.filter(shipment => {
      const shipmentDate = this.extractShipmentDate(shipment);
      return shipmentDate >= limitDate;
    });
  }

  private calculateLimitDate(): Date {
    const today = new Date();
    const daysMap: Record<string, number> = {
      week: 7,
      month: 30,
      year: 365
    };

    const daysBack = daysMap[this.timeFilter] ?? 7;
    return new Date(today.getTime() - daysBack * 24 * 60 * 60 * 1000);
  }

  // -----------------------------
  // Datum aus Status-History
  // -----------------------------
  private extractShipmentDate(shipment: Shipment): Date {
    const history = shipment.history as ShipmentStatusEntry[] | undefined;

    if (!history?.length) {
      return new Date(0);
    }

    return new Date(history[history.length - 1].timestamp);
  }

  // -----------------------------
  // Chart erzeugen
  // -----------------------------
  private updateChart(): void {
    this.chartInstance?.destroy();

    const visibleShipments = this.shipmentsInRange();

    const stats = {
      registered: 0,
      transit: 0,
      delivered: 0
    };

    visibleShipments.forEach(s => {
      switch (s.status) {
        case 'Registered':
          stats.registered++;
          break;
        case 'PackageInTransit':
          stats.transit++;
          break;
        case 'Received':
          stats.delivered++;
          break;
      }
    });

    this.chartInstance = new Chart('statsChart', {
      type: 'doughnut',
      data: {
        labels: ['Registriert', 'In Zustellung', 'Zugestellt'],
        datasets: [
          {
            label: 'Paketstatus',
            data: [
              stats.registered,
              stats.transit,
              stats.delivered
            ],
            backgroundColor: [
              '#3924c2ff',
              '#fbbd08',
              '#21ba45'
            ]
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: true
          }
        }
      }
    });
  }

  // -----------------------------
  // UI Event
  // -----------------------------
  onFilterChange(): void {
    this.updateChart();
  }
}

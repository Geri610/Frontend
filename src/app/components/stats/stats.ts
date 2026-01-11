import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart } from 'chart.js/auto';
import { Shipment } from '../../shared/shipment';
import { ShipmentService } from '../../services/shipment.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'Stats',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stats.html'
})
export class StatisticsComponent implements OnInit {

  Shipments: Shipment[] = [];

  private chartInstance?: Chart;

  constructor(
    private shipmentApi: ShipmentService,
     private session: SessionService
  ) {}

  ngOnInit(): void {
    this.getShipments();
  }

  private getShipments(): void {
    this.shipmentApi.getAllShipmentsForCustomer().subscribe(data => {
      if (!data) return;
      this.Shipments = data;
      this.drawChart();
    });
  }

  private drawChart(): void {
    this.chartInstance?.destroy();

    const StatusMessages = {
            Registered : 0,
            Paid : 0,
            Received : 0,
            PackageInTransit : 0,
            PackageInDelivery : 0,
            Delivered : 0
    };

    this.Shipments.forEach(s => {
      switch (s.status) {
        case 'Registered':
          StatusMessages.Registered++;
          break;
        case 'Paid':
          StatusMessages.Paid++;
          break;
        case 'Received':
          StatusMessages.Received++;
          break;
        case 'PackageInTransit':
          StatusMessages.PackageInTransit++;
          break;
        case 'PackageInDelivery':
          StatusMessages.PackageInDelivery++;
          break;
        case 'Delivered':
          StatusMessages.Delivered++;
          break;
      }
    });

    this.chartInstance = new Chart('statsChart', {
      type: 'bar',
      data: {
        labels: ['Registered', 'Paid', 'Received', 'In Transit' , 'In Delivery', 'Delivered'],
        datasets: [
          {
            label: 'Status der Pakete',
            data: [
              StatusMessages.Registered,
              StatusMessages.Paid,
              StatusMessages.Received,
              StatusMessages.PackageInTransit,
              StatusMessages.PackageInDelivery,
              StatusMessages.Delivered
            ],
            backgroundColor: [
              '#ff0000', // Rot
              '#ff6600', // Orange-Rot
              '#ffcc00', // Gelb
              '#99cc00', // Gelb-Grün
              '#33cc00', // Grünlich
              '#00ff00'  // Grün
            ]
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }
}

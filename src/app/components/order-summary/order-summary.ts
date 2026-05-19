import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderDto } from '../../shared/OrderDto';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-summary.html',
  styleUrl: './order-summary.css'
})
export class OrderSummaryComponent implements OnInit {
  order: OrderDto | null = null;

  constructor(private router: Router) {
    // Holt die mitgeschickten Daten aus dem Router-State (während der Navigation)
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state && navigation.extras.state['order']) {
      this.order = navigation.extras.state['order'];
    }
  }

  ngOnInit(): void {
    // Sicherheitsnetz: Wenn kein Order-Objekt existiert (z.B. durch manuellen Seiten-Refresh),
    // leiten wir den User zurück zur Startseite.
    if (!this.order) {
      this.router.navigate(['/']);
    }
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }
}
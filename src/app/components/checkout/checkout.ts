import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { CustomerDto } from '../../shared/CustomerDto';
import { OrderDto } from '../../shared/OrderDto';
import { PaymentMethodDto } from '../../shared/PaymentMethodDto';// Pfad anpassen

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class CheckoutComponent implements OnInit {
  customerId!: number;
  customer: CustomerDto | null = null;
  paymentMethods: PaymentMethodDto[] = [];
  selectedPayment: PaymentMethodDto | null = null;
  errorMessage: string = '';
  loading: boolean = true;

  constructor(
    private cartService: CartService, 
    private authService: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {
    const id = this.authService.getCustomerId();
    if (!id) {
      this.errorMessage = 'Bitte logge dich zuerst ein, um den Checkout durchzuführen.';
      this.loading = false;
      return;
    }
    this.customerId = id;
    this.loadCheckoutData();
  }

  loadCheckoutData(): void {
    this.loading = true;
    
    // 1. Kundendaten laden
    this.cartService.getCustomerForId(this.customerId).subscribe({
      next: (data) => {
        this.customer = data;
        this.checkLoadingState();
        console.log('CustomerID:', this.customerId);
        console.log('Customer:', this.customer.name);
      },
      error: (err) => {
        console.error('Fehler beim Laden der Kundendaten:', err);
        this.errorMessage = 'Kundendaten konnten nicht geladen werden.';
        this.loading = false;
      }
    });

    // 2. Zahlungsmethoden laden
    this.cartService.getPaymentMethods().subscribe({
      next: (methods) => {
        this.paymentMethods = methods;
        if (methods.length > 0) {
          this.selectedPayment = methods[0]; // Erste Methode vorauswählen
        }
        this.checkLoadingState();
      },
      error: (err) => {
        console.error('Fehler beim Laden der Zahlungsmethoden:', err);
        this.errorMessage = 'Zahlungsmethoden konnten nicht geladen werden.';
        this.loading = false;
      }
    });
  }

  private checkLoadingState(): void {
    if (this.customer && this.paymentMethods.length >= 0) {
      this.loading = false;
    }
  }

  onPlaceOrder(): void {
    if (!this.selectedPayment) {
      this.errorMessage = 'Bitte wähle eine Zahlungsmethode aus.';
      return;
    }

    this.loading = true;
    this.cartService.checkOutCart(this.customerId, this.selectedPayment.id).subscribe({
      next: (OrderDto) => {
        this.router.navigate(['/order-summary'], { state: { order: OrderDto } });
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = 'Die Bestellung ist fehlgeschlagen. Bitte versuche es erneut.';
        console.error('Checkout-Fehler:', err);
      }
    });
  }
}
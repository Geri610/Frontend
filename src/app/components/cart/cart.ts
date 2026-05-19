import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService} from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { CartDto } from '../../shared/CartDto';
import { CartItemDto } from '../../shared/CartItemDto';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent implements OnInit {
  cart: CartDto | null = null;
  userId: number | null = null;
  errorMessage = '';

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getCustomerId();

    if (this.userId) {
      this.loadCart();
    } else {
      this.errorMessage = 'Bitte logge dich zuerst ein.';
      this.router.navigate(['/login']);
    }
  }

  loadCart(): void {
    if (!this.userId) return;
    
    this.cartService.getCart(this.userId).subscribe({
      next: (data) => this.cart = data,
      error: (err) => console.error('Fehler beim Laden des Warenkorbs:', err)
    });

    console.log(this.cart);
  }

  increaseQuantity(item: CartItemDto): void {
    if (!this.userId) return;

    this.cartService.addItemToCart(this.userId, item.item.id).subscribe({
      next: () => this.loadCart(), // Warenkorb neu laden, um aktuelle Daten zu sehen
      error: (err) => console.error('Fehler beim Erhöhen der Stückzahl:', err)
    });
  }

  decreaseQuantity(item: CartItemDto): void {
    if (!this.userId) return;

    this.cartService.removeItemFromCart(this.userId, item.item.id).subscribe({
      next: () => this.loadCart(),
      error: (err) => console.error('Fehler beim Verringern der Stückzahl:', err)
    });
  }

  deleteItemCompletely(item: CartItemDto): void {
    if (!this.userId) return;

    this.cartService.removeItemFromCart(this.userId, item.item.id).subscribe({
        next: () => {
            this.loadCart();
        }
    });
  }

  getTotalPrice(): number {
    if (!this.cart || !this.cart.items) return 0;
    return this.cart.items.reduce((sum, item) => sum + (item.item.price * item.quantity), 0);
  }

  navigateToCheckout(): void {
    this.router.navigate(['/checkout']);
  }
}
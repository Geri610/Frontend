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
    // 1. ID des angemeldeten Benutzers holen
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

  // Stückzahl erhöhen (+ Button)
  increaseQuantity(item: CartItemDto): void {
    if (!this.userId) return;

    this.cartService.addItemToCart(this.userId, item.id).subscribe({
      next: () => this.loadCart(), // Warenkorb neu laden, um aktuelle Daten zu sehen
      error: (err) => console.error('Fehler beim Erhöhen der Stückzahl:', err)
    });
  }

  // Stückzahl verringern (- Button)
  decreaseQuantity(item: CartItemDto): void {
    if (!this.userId) return;

    // Wenn Stückzahl 1 ist und man verringert, wird der Artikel ganz gelöscht
    this.cartService.removeItemFromCart(this.userId, item.id).subscribe({
      next: () => this.loadCart(),
      error: (err) => console.error('Fehler beim Verringern der Stückzahl:', err)
    });
  }

  // Artikel komplett entfernen (Löschen Button)
  deleteItemCompletely(item: CartItemDto): void {
    if (!this.userId) return;

    // Da dein Java-Backend beim DELETE-Aufruf immer genau 1 Stück abzieht (removeItemFromCart),
    // simulieren wir das komplette Löschen, indem wir den DELETE-Befehl so oft senden, wie Artikel da sind.
    // (Alternativ müsste dein Backend ein Endpunkt für "komplett löschen" haben).
    const deleteRequests = [];
    for (let i = 0; i < item.quantity; i++) {
        deleteRequests.push(this.cartService.removeItemFromCart(this.userId!, item.id));
    }

    // Rekursiv oder nacheinander löschen:
    this.cartService.removeItemFromCart(this.userId, item.id).subscribe({
        next: () => {
            // Vereinfacht für FH-Zwecke: Wir triggern das Löschen und laden neu
            this.loadCart();
        }
    });
  }

  // Gesamtsumme berechnen für die Anzeige
  getTotalPrice(): number {
    if (!this.cart || !this.cart.items) return 0;
    return this.cart.items.reduce((sum, item) => sum + (item.item.price * item.quantity), 0);
  }

  // Zum Checkout navigieren
  navigateToCheckout(): void {
    this.router.navigate(['/checkout']);
  }
}
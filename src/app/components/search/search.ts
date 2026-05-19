import { Component } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { ItemDto } from '../../shared/ItemDto';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css' // Verwendet exakt dein bestehendes CSS für das Layout!
})
export class ProductSearch {
  items: ItemDto[] = [];
  selectedItem?: ItemDto;
  searchTerm: string = '';
  hasSearched: boolean = false;

  constructor(
    private itemService: ItemService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.itemService.searchItems(this.searchTerm.trim()).subscribe({
        next: (results) => {
          this.items = results;
          this.hasSearched = true;
        },
        error: (err) => {
          console.error('Fehler bei der Suche:', err);
          alert('Fehler bei der Ausführung der Suche.');
        }
      });
    } else {
      this.items = [];
      this.hasSearched = false;
    }
  }

  showDetails(id: number): void {
    this.itemService.getItemById(id).subscribe(item => {
      this.selectedItem = item;
    });
  }

  addToCart(itemId: number): void {
    const customerId = this.authService.getCustomerId();

    if (!customerId) {
      alert('Bitte logge dich zuerst ein, um Artikel in den Warenkorb zu legen!');
      return;
    }

    this.cartService.addItemToCart(customerId, itemId).subscribe({
      next: () => {
        this.router.navigate(['/cart']);
      },
      error: (err) => {
        console.error('Fehler beim Hinzufügen zum Warenkorb:', err);
        alert('Fehler beim Hinzufügen zum Warenkorb.');
      }
    });
  }
}
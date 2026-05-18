import { Component, OnInit } from '@angular/core'; // OnInit hinzugefügt
import { ItemService } from '../../services/item.service';
import { CartService } from '../../services/cart.service'; // <-- NEU
import { AuthService } from '../../services/auth.service'; // <-- NEU
import { ItemDto } from '../../shared/ItemDto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-items',
  imports: [FormsModule],
  templateUrl: './items.html',
  styleUrl: './items.css'
})
export class Items implements OnInit {
  items: ItemDto[] = [];
  selectedItem?: ItemDto;
  searchTerm: string = '';
  loading: boolean = false;
  
  // 1. Services im Konstruktor ergänzen
  constructor(
    private itemService: ItemService,
    private cartService: CartService,
    private authService: AuthService
  ){}

  ngOnInit(): void {
    this.loadPopular();
  }

  // --- IN DEN WARENKORB HINZUFÜGEN (NEU!) ---
  addToCart(itemId: number): void {
    // ID des aktuell eingeloggten Benutzers holen
    const customerId = this.authService.getCustomerId();

    if (!customerId) {
      alert('Bitte logge dich zuerst ein, um Artikel in den Warenkorb zu legen!');
      return;
    }

    // Aufruf an das Spring-Boot-Backend (POST /cart/add?customerId=X&itemId=Y)
    this.cartService.addItemToCart(customerId, itemId).subscribe({
      next: () => {
        alert('Artikel wurde erfolgreich zum Warenkorb hinzugefügt! 🛒');
      },
      error: (err) => {
        console.error('Fehler beim Hinzufügen zum Warenkorb:', err);
        alert('Fehler beim Hinzufügen zum Warenkorb.');
      }
    });
  }

  // --- RESTLICHE METHODEN (showDetails, loadPopular, etc. bleiben exakt gleich) ---
  showDetails(id: number): void {
    this.itemService.getItemById(id).subscribe(item => {
      this.selectedItem = item;
    });
  }

  loadPopular(): void {
    this.itemService.getMostPopularItems().subscribe(data => {
      this.items = data;
    });
  }

  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.itemService.searchItems(this.searchTerm).subscribe(results => {
        this.items = results;
      });
    }
  }
}
import { Component } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from '../../shared/item';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-items',
  imports: [FormsModule],
  templateUrl: './items.html',
  styleUrl: './items.css'
})
export class Items {
  items: Item[] = [];
  selectedItem?: Item;
  searchTerm: string = '';
  loading: boolean = false;
  
  constructor(
    private itemService: ItemService){}

ngOnInit(): void {
    // 1. Alle Items beim Start laden
    // this.loadAllItems();
    this.loadPopular();
  }

 // --- GET ALL ---
 /*
  loadAllItems(): void {
    this.itemService.getAllItems().subscribe({
      next: (data) => this.items = data,
      error: (err) => console.error('Fehler beim Laden:', err)
    });
  }
    */

  // --- GET BY ID ---
  showDetails(id: number): void {
    this.itemService.getItemById(id).subscribe(item => {
      this.selectedItem = item;
    });
  }

  // --- POST ---
  addNewItem(): void {
    const newItem: Item = { id: 0, name: 'Neues Produkt', description: 'Beschreibung', price: 19.99 };
    this.itemService.createItem(newItem).subscribe(createdItem => {
      this.items.push(createdItem); // Liste lokal aktualisieren
    });
  }

  // --- PUT ---
  updatePrice(item: Item): void {
    const updatedData = { ...item, price: item.price + 5 };
    this.itemService.updateItem(item.id, updatedData).subscribe(updatedItem => {
      // Item in der Liste ersetzen
      const index = this.items.findIndex(i => i.id === item.id);
      this.items[index] = updatedItem;
    });
  }

  // --- DELETE ---
  deleteItem(id: number): void {
    if (confirm('Wirklich löschen?')) {
      this.itemService.deleteItem(id).subscribe(() => {
        // Erfolgreich gelöscht -> aus lokalem Array entfernen
        this.items = this.items.filter(i => i.id !== id);
      });
    }
  }

  // --- GET POPULAR ---
  loadPopular(): void {
    this.itemService.getMostPopularItems().subscribe(data => {
      this.items = data;
    });
  }

  // --- SEARCH ---
  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.itemService.searchItems(this.searchTerm).subscribe(results => {
        this.items = results;
      });
    }
  }
}
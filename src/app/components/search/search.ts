import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ItemService } from '../../services/item.service';
import { ItemDto } from '../../shared/ItemDto';

@Component({
  selector: 'app-product-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class ProductSearchComponent {
  searchQuery: string = '';
  searchResults: ItemDto[] = [];
  hasSearched: boolean = false; // Steuert die Anzeige von "Keine Produkte gefunden"
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private itemService: ItemService, private router: Router) {}

  onSearch(): void {
    // Leere Suchanfragen abfangen
    if (!this.searchQuery || this.searchQuery.trim() === '') {
      this.searchResults = [];
      this.hasSearched = false;
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.itemService.searchItems(this.searchQuery.trim()).subscribe({
      next: (results) => {
        this.searchResults = results;
        this.hasSearched = true;
        this.loading = false;
      },
      error: (err) => {
        console.error('Fehler bei der Produktsuche:', err);
        this.errorMessage = 'Es gab ein Problem bei der Suche. Bitte versuche es erneut.';
        this.loading = false;
      }
    });
  }

  // Navigiert zu den Produktdetails und übergibt die ID im Pfad (/product-details/4)
  goToDetails(productId: number): void {
    this.router.navigate(['/product-details', productId]);
  }
}
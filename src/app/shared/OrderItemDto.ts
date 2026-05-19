// src/app/models/order-item.models.ts

import { ItemDto } from './ItemDto'; // Pfad zu deinem bereits existierenden ItemDto anpassen

export class OrderItemDto {
  id: number;
  item: ItemDto | null; // Verschachteltes Item-Objekt aus dem Backend
  quantity: number;
  price: number;        // float wird in TS zu number

  constructor(
    id: number = 0, 
    item: ItemDto | null = null, 
    quantity: number = 0, 
    price: number = 0
  ) {
    this.id = id;
    this.item = item;
    this.quantity = quantity;
    this.price = price;
  }
}
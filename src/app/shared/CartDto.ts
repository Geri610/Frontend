import { CartItemDto } from "./CartItemDto";

export class CartDto {
  id: number;
  customerId: number;
  items: CartItemDto[]; // Entspricht deiner ArrayList in Java

  constructor(id: number, customerId: number, items: CartItemDto[] = []) {
    this.id = id;
    this.customerId = customerId;
    this.items = items;
  }
}
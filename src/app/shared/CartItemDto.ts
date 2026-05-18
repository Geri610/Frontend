import { ItemDto } from "./ItemDto";

export class CartItemDto{
  id: number;
  item: ItemDto;
  quantity: number;

  constructor(id: number = 0, item: ItemDto, quantity: number = 0) {
    this.id = id;
    this.item = item;
    this.quantity = quantity;
  }
}
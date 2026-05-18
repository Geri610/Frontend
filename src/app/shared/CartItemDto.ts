import { ItemDto } from "./ItemDto";

export class CartItemDto{
  id: number;
  item: ItemDto;
  quantity: number;

  constructor(id: number, item: ItemDto, quantity: number) {
    this.id = id;
    this.item = item;
    this.quantity = quantity;
  }
}
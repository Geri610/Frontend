// src/app/models/order.models.ts

import { CustomerDto } from './CustomerDto';
import { PaymentMethodDto } from './PaymentMethodDto';
import { OrderItemDto } from './OrderItemDto';

export class OrderDto {
  id: number;
  customer: CustomerDto | null;
  items: OrderItemDto[];
  orderDate: Date | string; // Kommt als ISO-String vom Java-Backend
  shippingAddress: string;
  total: number;            // float wird in TS zu number
  paymentMethod: PaymentMethodDto | null; // Nutzt deine polymorphen Klassen

  constructor(
    id: number = 0,
    customer: CustomerDto | null = null,
    items: OrderItemDto[] = [],
    orderDate: Date | string = new Date(),
    shippingAddress: string = '',
    total: number = 0,
    paymentMethod: PaymentMethodDto | null = null
  ) {
    this.id = id;
    this.customer = customer;
    this.items = items;
    this.orderDate = orderDate;
    this.shippingAddress = shippingAddress;
    this.total = total;
    this.paymentMethod = paymentMethod;
  }
}
import { UserSignUp } from "./user-signup";
import { Cart } from "./cart";
import { Address } from "./address";

export class Order {
  orderId: string;
  status: string;
  orderDate: string;
  contact: string;
  user: UserSignUp;
  cart: Cart[];
  totalPrice: number;
  deliveryDate: string;
  address: Address;

  constructor(
    orderId: string,
    status: string,
    orderDate: string,
    contact: string,
    user: UserSignUp
  ) {
    this.orderId = orderId;
    this.status = status;
    this.orderDate = orderDate;
    this.contact = contact;
    this.user = user;
  }
}

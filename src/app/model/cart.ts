import { Product } from "./product";
import { UserSignUp } from "./user-signup";
import { Order } from "./order";

export class Cart {
  cartProductId: number;
  cartStatus: number;
  product: Product;
  order: Order;
  user: UserSignUp;

  // constructor(
  //   cartProductId: number,
  //   cartStatus: number,
  //   product: Product,
  //   order: Order,
  //   user: UserSignUp
  // ) {
  //   this.cartProductId = cartProductId;
  //   this.cartStatus = cartStatus;
  //   this.product = product;
  //   this.order = order;
  //   this.user = user;
  // }
}

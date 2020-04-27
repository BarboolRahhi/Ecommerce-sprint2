import { Product } from "./product";
import { UserSignUp } from "./user-signup";

export class Cart {
  cartProductId: number;
  cartStatus: number;
  product: Product;
  user: UserSignUp;

  constructor(
    cartProductId: number,
    cartStatus: number,
    product: Product,
    user: UserSignUp
  ) {
    this.cartProductId = cartProductId;
    this.cartStatus = cartStatus;
    this.product = product;
    this.user = user;
  }
}

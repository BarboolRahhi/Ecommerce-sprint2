import { Product } from "./product";
import { User } from "./user";

export class Review {
  //  prodRatingId: number;
  rating: number;
  review: string;
  reviewDt: string;
  user: User;
  product: Product;

  constructor(
    rating: number,
    review: string,
    reviewDt: string,
    user: User,
    product: Product
  ) {
    this.rating = rating;
    this.review = review;
    this.reviewDt = reviewDt;
    this.user = user;
    this.product = product;
  }
}

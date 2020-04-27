import { UserSignUp } from "./user-signup";

export class Review {
  prodRatingId: number;
  rating: number;
  review: string;
  reviewDt: string;
  user: UserSignUp;

  constructor(
    prodRatingId: number,
    rating: number,
    review: string,
    reviewDt: string,
    user: UserSignUp
  ) {
    this.prodRatingId = prodRatingId;
    this.rating = rating;
    this.review = review;
    this.reviewDt = reviewDt;
    this.user = user;
  }
}

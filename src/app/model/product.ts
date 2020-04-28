import { Category } from "./category";
import { Retailer } from "./retailer";

export class Product {
  productId: number;
  productName: string;
  productInfo: string;
  price: number;
  brandName: string;
  quantity: number;
  overAllRating: number;
  category: Category;
  inventory: Retailer;
  imageUrl: string;

  constructor(
    productId: number,
    productName: string,
    productInfo: string,
    price: number,
    brandName: string,
    quantity: number,
    overAllRating: number,
    category: Category,
    inventory: Retailer
  ) {
    this.productId = productId;
    this.productName = productName;
    this.productInfo = productInfo;
    this.price = price;
    this.brandName = brandName;
    this.quantity = quantity;
    this.overAllRating = overAllRating;
    this.category = category;
    this.inventory = inventory;
  }
}

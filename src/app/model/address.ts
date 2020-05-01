import { User } from "./user";

export class Address {
  addressId: number;
  mobileNumber: number;
  pinCode: number;
  city: string;
  state: string;
  area: string;
  user: User;

  constructor(
    mobileNumber: number,
    pinCode: number,
    city: string,
    state: string,
    area: string,
    user: User
  ) {
    this.mobileNumber = mobileNumber;
    this.pinCode = pinCode;
    this.city = city;
    this.state = state;
    this.area = area;
    this.user = user;
  }
}

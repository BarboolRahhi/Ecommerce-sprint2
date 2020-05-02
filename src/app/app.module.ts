import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { CarouselComponent } from "./carousel/carousel.component";
import { UserComponent } from "./user/user.component";
import { SignInComponent } from "./user/sign-in/sign-in.component";
import { SignUpComponent } from "./user/sign-up/sign-up.component";
import { HomeComponent } from "./home/home.component";
import { ProductComponent } from "./product/product.component";
import { ProductListComponent } from "./product/product-list/product-list.component";
import { ProductDetailsComponent } from "./product/product-details/product-details.component";
import { CartComponent } from "./cart/cart.component";
import { OrderComponent } from "./order/order.component";
import { HomeItemComponent } from "./home-item/home-item.component";
import { OrderDetailsComponent } from "./order-details/order-details.component";
import { JwtInterceptor } from "./service/jwt.interceptor";
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CarouselComponent,
    UserComponent,
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    ProductComponent,
    ProductListComponent,
    ProductDetailsComponent,
    CartComponent,
    OrderComponent,
    HomeItemComponent,
    OrderDetailsComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

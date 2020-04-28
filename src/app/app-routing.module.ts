import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { UserComponent } from "./user/user.component";
import { SignInComponent } from "./user/sign-in/sign-in.component";
import { SignUpComponent } from "./user/sign-up/sign-up.component";
import { ProductComponent } from "./product/product.component";
import { ProductListComponent } from "./product/product-list/product-list.component";
import { ProductDetailsComponent } from "./product/product-details/product-details.component";
import { HomeItemComponent } from "./home-item/home-item.component";
import { CartComponent } from "./cart/cart.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      { path: "", redirectTo: "/home", pathMatch: "full" },
      { path: "home", component: HomeItemComponent },
      {
        path: "product",
        component: ProductComponent,
        children: [
          { path: "list", component: ProductListComponent },
          { path: "details", component: ProductDetailsComponent },
        ],
      },
      { path: "cart", component: CartComponent },
    ],
  },
  {
    path: "user",
    component: UserComponent,
    children: [
      { path: "signin", component: SignInComponent },
      { path: "signup", component: SignUpComponent },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

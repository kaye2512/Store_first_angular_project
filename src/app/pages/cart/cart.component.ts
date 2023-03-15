import {Component, OnInit} from '@angular/core';
import {Cart, CartItem} from 'src/app/model/cart.model';
import {CartService} from "../../service/cart.service";
import {HttpClient} from "@angular/common/http";
import {loadStripe} from "@stripe/stripe-js";
@Component({
  selector: 'app-cart',
  templateUrl: `cart.component.html`,
})
export class CartComponent implements OnInit {
  cart: Cart = { items: [{
      product: 'https://via.placeholder.com/150',
      name: 'snickers',
      price: 150,
      quantity: 1,
      id: 1,
    },
          {
              product: 'https://via.placeholder.com/150',
              name: 'snickers',
              price: 150,
              quantity: 3,
              id: 2,
          }


    ]};

  dataSource: Array<CartItem> = [];
  displayedColums: Array<string> = [
      'product',
      'name',
      'price',
      'quantity',
      'total',
      'action'
  ]
  ngOnInit(): void{

    this.cartService.cart.subscribe((_cart: Cart) => {
        this.cart = _cart;
        this.dataSource = this.cart.items;
    })
  }

  getTotal(items: Array<CartItem>): number{
      return this.cartService.getTotal(items);
  }

  constructor(private cartService: CartService, private http: HttpClient) {
  }

  onClearCart(): void {
      this.cartService.clearCart();
  }

  onRemoveFromCart( item: CartItem): void {
      this.cartService.removeFromCart(item);
  }

    onAddQuantity(item: CartItem): void {
        this.cartService.addToCart(item);
    }

    onRemoveQuantity(item: CartItem): void{
        this.cartService.removeQuantity(item)
    }

    onCheckout(): void{
        this.http.post('http://localhost:4242/checkout', {
            items: this.cart.items
        }).subscribe(async(res:any) => {
            let stripe = await loadStripe('pk_test_51MjlukBIGc5NSymzhQOsccgYEersTvp4FIBznCuXKgwTNanqxV5NyGsHEU8fSn07kQV1cj5t0d55nSqNw9XRhlJ40092u4pKSo');
            stripe?.redirectToCheckout({
                sessionId: res.id
            })
        });

    }
}

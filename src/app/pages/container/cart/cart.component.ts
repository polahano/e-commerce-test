import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CartService } from '../../../core/services/cart/cart.service';
import { log } from 'console';
import { ICart } from '../../../shared/interfaces/icart';
import { IProduct } from '../../../shared/interfaces/iproduct';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  private readonly cartService = inject(CartService)
  cartProducts: IProduct[] | null = [];
  cartData: ICart = {} as ICart;

  ngOnInit(): void {
    this.cartService.getUserCartItems().subscribe({
      next: (res) => {
        console.log(res);
        this.cartData = res.data;
        this.cartService.cartId.set(res.cartId);
        this.cartProducts = res.data.products;
        this.cartService.cartItemsCount.set(res.data.products.length);
      }
    })
  }


  removeItem(id: string): void {
    this.cartService.removeCartItem(id).subscribe({
      next: (res) => {
        this.cartProducts = res.data.products;
        this.cartService.cartItemsCount.set(res.data.products.length)
        this.cartData = res.data;
        console.log(res.data.products);

      },
      error: (err) => {
        this.cartProducts = []
        console.log(err);

      }
    })
  }

  clearUserCart() {
    this.cartProducts = []
    this.cartService.cartItemsCount.set(0)
    this.cartData.totalCartPrice = 0;
    this.removeItem('')
  }

  updateCartProductCount(productId: string, newCount: number) {
    if (newCount != 0) {
      this.cartService.updateCartProductCount(productId, newCount).subscribe({
        next: (res) => {
          console.log(res.data.products);
          this.cartService.cartItemsCount.set(res.data.products.length)
          this.cartProducts = res.data.products;
          this.cartData = res.data;
        }
      })
    }
  }

}

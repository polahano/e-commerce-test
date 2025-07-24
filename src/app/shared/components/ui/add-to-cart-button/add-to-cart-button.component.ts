import { Component, inject, input } from '@angular/core';
import { ProductService } from '../../../../core/services/product/product.service';
import { CartService } from '../../../../core/services/cart/cart.service';

@Component({
  selector: 'app-add-to-cart-button',
  imports: [],
  templateUrl: './add-to-cart-button.component.html',
  styleUrl: './add-to-cart-button.component.scss'
})
export class AddToCartButtonComponent {
  [x: string]: any;

  readonly productId = input<string>()
  private readonly cartService = inject(CartService);
  width = input('')

  addToCart(): void {
    this.cartService.addProductToCart(this.productId()!).subscribe({
      next: (res) => {
        console.log(res.numOfCartItems);
        this.cartService.cartItemsCount.set(res.numOfCartItems)
      }
    })

  }



}

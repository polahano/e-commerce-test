import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import { IProduct } from '../../../shared/interfaces/iproduct';
import { CartService } from '../../../core/services/cart/cart.service';

@Component({
  selector: 'app-wishlist',
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {


  private readonly wishlistService = inject(WishlistService)
  private readonly cartService = inject(CartService)
  wishlistArr = computed(this.wishlistService.wishlistArr)


  ngOnInit(): void {
    this.getWishlist()
  }


  getWishlist() {
    this.wishlistService.getWishlist().subscribe({
      next: (res) => {
        console.log(res);
        this.wishlistService.wishlistArr.set(res.data)
        for (let x = 0; x < this.wishlistService.wishlistArr().length; x++) {
          this.wishlistService.wishlistArr()[x].isWishlistItem = true
        }
      }
    })
  }


  addProductToWishlist(productId: string) {
    this.wishlistService.addProductToWishlist(productId).subscribe({
      next: (res) => {
        this.getWishlist()
        console.log(res);
      }
    })
  }

  removeProductFromWishlist(productId: string) {
    this.wishlistService.removeProductFromWishlist(productId).subscribe({
      next: (res) => {
        this.getWishlist()
        console.log(res);
      }
    })
  }


  emptyWishlist() {
    for (let wishlistItem of this.wishlistArr()) {
      this.removeProductFromWishlist(wishlistItem._id)
    }
  }

  addWishlistItemToCart(productId: string) {
    this.cartService.addProductToCart(productId).subscribe({
      next: (res) => {
        this.getWishlist()
        console.log(res);
        this.removeProductFromWishlist(productId)
      }
    })
  }

}

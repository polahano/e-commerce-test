import { Component, computed, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product/product.service';
import { IProduct } from '../../../shared/interfaces/iproduct';
import { RouterLink } from '@angular/router';
import { AddToCartButtonComponent } from "../../../shared/components/ui/add-to-cart-button/add-to-cart-button.component";
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
// import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';



@Component({
  selector: 'app-home',
  imports: [RouterLink, AddToCartButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {


  private readonly productService = inject(ProductService)
  private readonly wishlistService = inject(WishlistService)

  productsArr = computed(() => this.productService.productsArr())
  wishlistArray = computed(() => this.wishlistService.wishlistArr())

  // customOptions: OwlOptions = {
  //     loop: true,
  //     mouseDrag: false,
  //     touchDrag: false,
  //     pullDrag: false,
  //     dots: false,
  //     navSpeed: 700,
  //     navText: ['', ''],
  //     responsive: {
  //       0: {
  //         items: 1
  //       },
  //       400: {
  //         items: 2
  //       },
  //       740: {
  //         items: 3
  //       },
  //       940: {
  //         items: 4
  //       }
  //     },
  //     nav: true
  //   }


  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.productService.productsArr.set(res.data);
      }
    })

    this.wishlistService.getWishlist().subscribe({
      next: (res) => {
        console.log(res);
        this.wishlistService.wishlistArr.set(res.data)
      }
    })
  }


  isWishListItem(productId: string): boolean {
    if (this.wishlistArray().find(p => p._id === productId)) {
      return true
    } else {
      return false
    }
  }

  shuffleWishlistStatus(product: IProduct) {
    if (this.isWishListItem(product._id)) {
      this.wishlistService.removeProductFromWishlist(product._id).subscribe({
        next: (res) => {
          console.log(res);
          // very tricky
          this.wishlistService.wishlistArr.set(this.wishlistService.wishlistArr().filter(p => p._id !== product._id));
        }
      })
    } else {
      this.wishlistService.addProductToWishlist(product._id).subscribe({
        next: (res) => {
          console.log(res);
          // very tricky
          this.wishlistService.wishlistArr.set([...this.wishlistService.wishlistArr(), product]);
        }
      })
    }

  }


}

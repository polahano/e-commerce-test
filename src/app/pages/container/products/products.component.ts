import { Component, computed, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product/product.service';
import { IProduct } from '../../../shared/interfaces/iproduct';
import { Router, RouterLink } from '@angular/router';
import { AddToCartButtonComponent } from "../../../shared/components/ui/add-to-cart-button/add-to-cart-button.component";
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { CategoriesService } from '../../../core/services/categories/categories.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-products',
  imports: [AddToCartButtonComponent, RouterLink, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  [x: string]: any;

  constructor(private flowbiteService: FlowbiteService) { }


  private readonly productService = inject(ProductService)
  private readonly wishlistService = inject(WishlistService)
  private readonly categoriesService = inject(CategoriesService)
  private readonly router = inject(Router)

  productsArr = computed(() => this.productService.productsArr())
  wishlistArray = computed(() => this.wishlistService.wishlistArr())
  categoriesArr = computed(() => this.categoriesService.categoriesArr())
  filteredProductsArr: IProduct[] = []
  searchText = ''


  //slider

  minValue: number = 0;
  maxValue: number = 42960;



  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    this.productService.getProducts().subscribe({
      next: (res) => {
        this.productService.productsArr.set(res.data);
        this.maxValue = Math.max(...this.productsArr().map(p => p.price));
        this.filteredProductsArr = this.productService.productsArr()
      }
    })

    this.wishlistService.getWishlist().subscribe({
      next: (res) => {
        console.log(res);
        this.wishlistService.wishlistArr.set(res.data)
      }
    })

    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categoriesService.categoriesArr.set(res.data)
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

  selectedCategoryIds: Set<string> = new Set(); //to use has function


  filterProductsBySelectedCategories(): void {
    if (this.selectedCategoryIds.size === 0) {
      this.filteredProductsArr = this.productService.productsArr(); // show all
    } else {
      this.filteredProductsArr = this.productService.productsArr().filter(product =>
        this.selectedCategoryIds.has(product.category._id)
      );
    }
  }


  onCategoryCheckboxChange(event: Event, categoryId: string) {
    const input = event.target as HTMLInputElement;

    if (input.checked) {
      this.selectedCategoryIds.add(categoryId);
    } else {
      this.selectedCategoryIds.delete(categoryId);
    }
    this.filterProductsBySelectedCategories();
  }

  sortOption: string = '';

  applySort() {
    switch (this.sortOption) {
      case 'price-asc':
        this.filteredProductsArr.sort((a, b) => a.price - b.price); break;
      case 'price-desc':
        this.filteredProductsArr.sort((a, b) => b.price - a.price); break;
      case 'rating-desc':
        this.filteredProductsArr.sort((a, b) => b.ratingsAverage - a.ratingsAverage); break;
    }
  }

  //Search input

  onSearchInputChange() {

    this.filteredProductsArr = this.productService.productsArr().filter(item =>
      item.title.toLowerCase().includes(this.searchText.toLowerCase()));

  }

  goToDetails(productId: string) {
    this.router.navigate([`/details/${productId}`])
    this.searchText = ''
    this.onSearchInputChange()
  }

  onSeachButton(searchText: string) {
    this.router.navigate(['/products'])
  }


}

import { Component, computed, inject, input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { jwtDecode } from 'jwt-decode';
import { IUser } from '../../shared/interfaces/iuser';
import { ProductService } from '../../core/services/product/product.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  constructor(private flowbiteService: FlowbiteService) { }

  private readonly cartService = inject(CartService);
  private readonly productService = inject(ProductService);
  private readonly router = inject(Router);
  isLoggedIn = input(false);
  cartCount = computed(() => this.cartService.cartItemsCount());
  tokenDecoded: IUser = {} as IUser;
  searchedProductsArr = computed(() => this.productService.searchedProductsArr())
  searchText = ''


  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
    this.cartService.getUserCartItems().subscribe({
      next: (res) => {
        this.cartService.cartItemsCount.set(res.numOfCartItems)
      }
    })

    this.productService.getProducts().subscribe({
      next: (res) => {
        this.productService.productsArr.set(res.data)
      }
    })


    if (localStorage.getItem('loggedInToken') !== null) {
      this.tokenDecoded = jwtDecode(localStorage.getItem('loggedInToken')!)
    }
  }

  signOut(): void {
    localStorage.removeItem('loggedInToken');
  }

  onSearchInputChange() {
    console.log(this.productService.searchedProductsArr().filter(item =>
      item.title.toLowerCase().includes(this.searchText.toLowerCase())));

    this.productService.searchedProductsArr.set(this.productService.productsArr().filter(item =>
      item.title.toLowerCase().includes(this.searchText.toLowerCase())));

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

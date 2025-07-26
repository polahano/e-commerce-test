import { Component, computed, inject, input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { jwtDecode } from 'jwt-decode';
import { IUser } from '../../shared/interfaces/iuser';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  constructor(private flowbiteService: FlowbiteService) { }

  private readonly cartService = inject(CartService);
  isLoggedIn = input(false);
  cartCount = computed(() => this.cartService.cartItemsCount());
  tokenDecoded: IUser = {} as IUser;


  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
    this.cartService.getUserCartItems().subscribe({
      next: (res) => {
        this.cartService.cartItemsCount.set(res.numOfCartItems)
      }
    })

    if (localStorage.getItem('loggedInToken') !== null) {
      this.tokenDecoded = jwtDecode(localStorage.getItem('loggedInToken')!)
    }
  }

  signOut(): void {
    localStorage.removeItem('loggedInToken');
  }

}

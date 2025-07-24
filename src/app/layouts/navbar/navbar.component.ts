import { Component, computed, inject, input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  constructor(private flowbiteService: FlowbiteService) { }

  cartService = inject(CartService);
  isLoggedIn = input(false);
  cartCount = computed(() => this.cartService.cartItemsCount());


  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
    this.cartService.getUserCartItems().subscribe({
      next: (res) => {
        this.cartService.cartItemsCount.set(res.numOfCartItems)
      }
    })

  }

  signOut(): void {
    localStorage.removeItem('loggedInToken');
  }

}

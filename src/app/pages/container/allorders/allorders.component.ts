import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../../core/services/orders/orders.service';
import { jwtDecode } from 'jwt-decode';
import { IUser } from '../../../shared/interfaces/iuser';
import { IOrder } from '../../../shared/interfaces/iorder';
import { ICart } from '../../../shared/interfaces/icart';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-allorders',
  imports: [RouterLink],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {

  ordersService = inject(OrdersService)
  tokenDecoded: IUser = jwtDecode(localStorage.getItem('loggedInToken')!)
  ordersArr: IOrder[] = [];
  cartItems: ICart[] = [];

  ngOnInit(): void {
    this.getallOrders()
  }


  getallOrders() {
    this.ordersService.getAllOrders(this.tokenDecoded.id).subscribe({
      next: (res) => {
        this.ordersArr = res;
        this.cartItems = res[0].cartItems;
        console.log(res);

      }
    })
  }


}

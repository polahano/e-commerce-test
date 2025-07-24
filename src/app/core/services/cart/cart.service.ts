import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient: HttpClient) { }

  cartItemsCount: WritableSignal<number> = signal(0)
  cartId: WritableSignal<string> = signal('')

  getUserCartItems(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/cart`, {

    })
  }

  removeCartItem(productId: string): Observable<any> {
    console.log(productId);
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart/${productId}`)
  }

  clearUserCart(): Observable<any> {
    console.log(this.removeCartItem(''));
    return this.removeCartItem('')
  }


  updateCartProductCount(productId: string, newCount: number): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/api/v1/cart/${productId}`, { 'count': newCount })
  }

  goToCheckoutSession(cartId: string, shippingData: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${window.location.origin}`, {
      "shippingAddress": shippingData
    })
  }

  addProductToCart(productId: string): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/cart`,
      {
        "productId": productId
      })
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { environment } from '../../environments/environment';
import { IProduct } from '../../../shared/interfaces/iproduct';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private httpClient: HttpClient) { }

  wishlistArr: WritableSignal<IProduct[]> = signal([])



  addProductToWishlist(productId: string): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/wishlist`, {
      "productId": productId
    })
  }

  removeProductFromWishlist(productId: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${productId}`)
  }

  getWishlist(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/wishlist`)
  }



}

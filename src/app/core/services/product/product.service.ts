import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IProduct } from '../../../shared/interfaces/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  productsArr: WritableSignal<IProduct[]> = signal([])
  searchedProductsArr: WritableSignal<IProduct[]> = signal([])


  getProducts(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/products`)
  }

  getProductDetailsByID(productId: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/products/${productId}`)
  }



}

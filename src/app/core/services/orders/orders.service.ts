import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {


  constructor(private httpClient: HttpClient) {


  }


  getAllOrders(userId: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/orders/user/${userId}`)
  }


}


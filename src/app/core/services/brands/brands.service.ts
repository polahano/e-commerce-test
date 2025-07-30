import { Injectable, signal, WritableSignal } from '@angular/core';
import { IBrand } from '../../../shared/interfaces/ibrand';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {


  constructor(private httpClient: HttpClient) { }

  brandsArr: WritableSignal<IBrand[]> = signal([])

  getAllBrands(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/brands`)
  }

  getSpecificCategory(brandId: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/brands/${brandId}`)
  }



}

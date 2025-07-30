import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ISubcategory } from '../../../shared/interfaces/isubcategory';
import { ICategory } from '../../../shared/interfaces/icategory';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private httpClient: HttpClient) { }

  subcategoriesArr: WritableSignal<ISubcategory[]> = signal([])
  categoriesArr: WritableSignal<ICategory[]> = signal([])

  getAllCategories(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/categories`)
  }

  getSpecificCategory(categoryId: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/categories/${categoryId}`)
  }

  getAllSubcategories(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/subcategories`)
  }

  getSpecificSubcategory(subcategoryId: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/subcategories/${subcategoryId}`)
  }

  getAllSubcategoriesOfSpecificCategory(categoryId: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/categories/${categoryId}/subcategories`)
  }

}

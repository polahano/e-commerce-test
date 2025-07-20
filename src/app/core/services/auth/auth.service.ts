import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { 

  }

   

register(data : object):Observable<any>{
  return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signup`,data)
}

LogIn(data : object):Observable<any>{
  return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signin`,data)
}

}

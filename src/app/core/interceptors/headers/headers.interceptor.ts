import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {

  if (localStorage.getItem('loggedInToken') !== null
    && (req.url.includes('cart') || req.url.includes('orders') || req.url.includes('wishlist'))) {
    req = req.clone({
      setHeaders: {
        token: localStorage.getItem('loggedInToken')!
      }
    })
  }


  return next(req);
};

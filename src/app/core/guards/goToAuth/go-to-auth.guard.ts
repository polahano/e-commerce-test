import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const goToAuthGuard: CanActivateFn = (route, state) => {

  let router = inject(Router)
  let ID = inject(PLATFORM_ID)


  if (isPlatformBrowser(ID)) {
    if (localStorage.getItem('loggedInToken') !== null) {
      router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }



};

import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const goToHomeGuard: CanActivateFn = (route, state) => {

  let router = inject(Router)
  let ID = inject(PLATFORM_ID)


  if (isPlatformBrowser(ID)) {
    if (localStorage.getItem('loggedInToken') !== null) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  } else {
    return false;
  }


};

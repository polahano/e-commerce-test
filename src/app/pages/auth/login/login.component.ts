import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { confirmPasswordValidator } from '../../../confirm-password.validator';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { jwtDecode } from "jwt-decode";


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  isLoading: boolean = false
  responseErrorMsg: string = ''


  logInForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  },
  );

  res: any = null
  logIn(): void {
    if (this.logInForm.valid) {
      this.isLoading = true;
      console.log(this.logInForm.value);
      this.authService.LogIn(this.logInForm.value).subscribe({
        next: (res) => {
          this.responseErrorMsg = '';
          this.isLoading = false;
          this.res = res;
          localStorage.setItem('loggedInToken', res.token)
          setTimeout(() => {
            this.router.navigate(['/home'])
          }, 1500)
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
          this.responseErrorMsg = err.error.message;
        }
      })

    } else {
      this.logInForm.markAllAsTouched()
    }

  }

}

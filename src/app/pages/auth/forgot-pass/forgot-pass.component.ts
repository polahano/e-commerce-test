import { Component, inject, viewChild, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { NgOtpInputComponent } from 'ng-otp-input';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgot-pass',
  imports: [ReactiveFormsModule, NgOtpInputComponent],
  templateUrl: './forgot-pass.component.html',
  styleUrl: './forgot-pass.component.scss'
})
export class ForgotPassComponent {


  OTP: string = ''
  onOtpChange(value: string) {
    this.OTP = value;
    console.log('OTP:', this.OTP);
  }

  private readonly authService = inject(AuthService)
  email: string = ''
  resetCode: string = ''
  newPass: string = ''
  responseErrorMsg: string = ''
  isLoading: boolean = false
  stepFlag: number = 0
  private readonly router = inject(Router)
  success: any = ''


  verifyEmailForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  })


  verifyResetCodeForm = new FormGroup({
    resetCode: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{6}$/)]),
  })


  resetPasswordForm = new FormGroup({
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,}$/)]),
  })


  verifyEmail() {
    this.isLoading = true
    this.authService.verifyEmail(this.verifyEmailForm.controls.email.value!).subscribe({
      next: (res) => {
        this.isLoading = false
        this.responseErrorMsg = ''
        this.stepFlag = 1
      }, error: (err) => {
        this.isLoading = false
        this.responseErrorMsg = err.error.message
      }
    })
  }

  verifyResetCode() {
    this.isLoading = true
    this.authService.verifyResetCode(this.OTP).subscribe({
      next: (res) => {
        this.isLoading = false
        this.responseErrorMsg = ''
        this.stepFlag = 2
      }, error: (err) => {
        this.isLoading = false
        console.log(err);
        this.responseErrorMsg = err.error.message
      }
    })
  }

  resetPassword() {
    this.isLoading = true
    this.authService.resetPassword(this.verifyEmailForm.controls.email.value!, this.resetPasswordForm.controls.newPassword.value!).subscribe({
      next: (res) => {
        this.isLoading = false
        this.success = res
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      }, error: (err) => {
        this.isLoading = false
        this.responseErrorMsg = err.error.message
      }
    })
  }



}

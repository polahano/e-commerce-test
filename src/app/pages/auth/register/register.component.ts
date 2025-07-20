import { Component, inject } from '@angular/core';
import {FormControl, FormGroup, NG_ASYNC_VALIDATORS, ReactiveFormsModule, Validators} from '@angular/forms'
import { confirmPasswordValidator } from '../../../confirm-password.validator';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

private readonly authService = inject(AuthService)
private readonly router = inject(Router)
isLoading: boolean = false
responseErrorMsg:string=''


  registerForm : FormGroup = new FormGroup({
    name: new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    email: new FormControl(null,[Validators.required,Validators.email]),
    password: new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,}$/)]),
    rePassword: new FormControl(null,[Validators.required ] ),
    phone: new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
    
  }, 
  { validators: confirmPasswordValidator }
);
  

signUp():void{
if (this.registerForm.valid) {
  this.isLoading =true;
console.log(this.registerForm.value);
  this.authService.register(this.registerForm.value).subscribe({
    next:(res)=>{
      console.log(res);
      this.isLoading=false;
      setTimeout(()=>{
        this.router.navigate(['/login'])
      },1500)
    }, 
    error:(err)=>{
      console.log(err);
      this.isLoading=false;
      this.responseErrorMsg = err.error.message;

    }
  })

} 

}

}

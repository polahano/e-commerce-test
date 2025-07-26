import { Component, computed, inject, NgModule, OnInit, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../../core/services/cart/cart.service';
import { Router } from '@angular/router';
import { log } from 'console';
import { CashVisaCardComponent } from "../../../shared/components/ui/cash-visa-card/cash-visa-card.component";

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {


  private readonly formBuilder = inject(FormBuilder)
  private readonly router = inject(Router)
  cartService = inject(CartService)
  responseErrorMsg: string = ''
  isLoading: boolean = false
  res: any = null
  cartId = computed(() => this.cartService.cartId())
  stripeSession: string = ''
  selectedPayment = ''

  paymentForm = this.formBuilder.group({
    details: [null, Validators.required],
    phone: [null, [Validators.required, Validators.pattern(/^01[1205][0-9]{8}$/)]],
    city: [null, Validators.required],
    paymentMethod: [null, Validators.required]
  });

  ngOnInit(): void {
    console.log(this.paymentForm);



  }

  proceedToCheckout() {
    if (this.paymentForm.valid) {
      this.isLoading = true;

      if (this.paymentForm.controls.paymentMethod.value == 'visa') {
        this.cartService.goToVisaCheckoutSession(this.cartId(), this.paymentForm.value).subscribe({
          next: (res) => {
            console.log(res);
            this.responseErrorMsg = ''
            this.isLoading = false;
            this.res = res;
            this.stripeSession = res.session.url
            this.cartService.cartItemsCount.set(0)
            setTimeout(() => {
              window.open(res.session.url, '_self')
            }, 1500)
          },
          error: (err) => {
            console.log(err);
            this.responseErrorMsg = err.error.message
            this.isLoading = false;
            this.paymentForm.markAllAsTouched()
          }
        })
      } else if (this.paymentForm.controls.paymentMethod.value == 'cash') {
        this.cartService.createCashOrder(this.cartId(), this.paymentForm.value).subscribe({
          next: (res) => {
            console.log(res);
            this.responseErrorMsg = ''
            this.isLoading = false;
            this.res = res;
            this.cartService.cartItemsCount.set(0)
            setTimeout(() => {
              this.router.navigate(['/allorders'])
            }, 1500)
          },
          error: (err) => {
            console.log(err);
            this.responseErrorMsg = err.error.message
            this.isLoading = false;
            this.paymentForm.markAllAsTouched()
          }
        })
      }

    }
  }
}

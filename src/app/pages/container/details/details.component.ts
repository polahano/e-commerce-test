import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../core/services/product/product.service';
import { IProduct } from '../../../shared/interfaces/iproduct';
import { AddToCartButtonComponent } from "../../../shared/components/ui/add-to-cart-button/add-to-cart-button.component";

@Component({
  selector: 'app-details',
  imports: [AddToCartButtonComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly productService = inject(ProductService)
  productID: string = ''
  productDetails: IProduct = {} as IProduct;


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.productID = res.get('id')!;
        this.productService.getProductDetailsByID(this.productID).subscribe({
          next: (details) => {
            this.productDetails = details.data
          }
        })
      }
    })
  }




}

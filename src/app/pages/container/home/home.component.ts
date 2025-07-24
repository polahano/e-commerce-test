import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product/product.service';
import { IProduct } from '../../../shared/interfaces/iproduct';
import { RouterLink } from '@angular/router';
import { AddToCartButtonComponent } from "../../../shared/components/ui/add-to-cart-button/add-to-cart-button.component";
// import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';



@Component({
  selector: 'app-home',
  imports: [RouterLink, AddToCartButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {


  private readonly productService = inject(ProductService)

  productsArr: IProduct[] = []

  // customOptions: OwlOptions = {
  //     loop: true,
  //     mouseDrag: false,
  //     touchDrag: false,
  //     pullDrag: false,
  //     dots: false,
  //     navSpeed: 700,
  //     navText: ['', ''],
  //     responsive: {
  //       0: {
  //         items: 1
  //       },
  //       400: {
  //         items: 2
  //       },
  //       740: {
  //         items: 3
  //       },
  //       940: {
  //         items: 4
  //       }
  //     },
  //     nav: true
  //   }


  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.productsArr = res.data;
      }
    })
  }




}

import { Component, computed, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product/product.service';
import { IProduct } from '../../../shared/interfaces/iproduct';
import { RouterLink } from '@angular/router';
import { AddToCartButtonComponent } from "../../../shared/components/ui/add-to-cart-button/add-to-cart-button.component";
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import { CategoriesService } from '../../../core/services/categories/categories.service';
import { ICategory } from '../../../shared/interfaces/icategory';
import { BrandsService } from '../../../core/services/brands/brands.service';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
// import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';



@Component({
  selector: 'app-home',
  imports: [RouterLink, AddToCartButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(private flowbiteService: FlowbiteService) { }

  private readonly categoriesService = inject(CategoriesService)
  private readonly brandsService = inject(BrandsService)

  categoriesArr = computed(() => this.categoriesService.categoriesArr())
  brandsArr = computed(() => this.brandsService.brandsArr())

  ngOnInit(): void {

    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    this.getAllCategories()
    this.getAllBrands()
  }


  getAllCategories() {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res);
        this.categoriesService.categoriesArr.set(res.data)
      }
    })
  }

  getAllBrands() {
    this.brandsService.getAllBrands().subscribe({
      next: (res) => {
        console.log(res);
        this.brandsService.brandsArr.set(res.data)
      }
    })
  }


}

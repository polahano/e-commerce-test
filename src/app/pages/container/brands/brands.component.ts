import { Component, computed, inject } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { BrandsService } from '../../../core/services/brands/brands.service';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {


  private readonly brandsService = inject(BrandsService)
  constructor(private flowbiteService: FlowbiteService) { }


  brandsArr = computed(() => this.brandsService.brandsArr())

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    this.getAllBrands()
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

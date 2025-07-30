import { Component, computed, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../../core/services/categories/categories.service';
import { ICategory } from '../../../shared/interfaces/icategory';
import { log } from 'console';
import { ISubcategory } from '../../../shared/interfaces/isubcategory';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {

  private readonly categoriesService = inject(CategoriesService)
  constructor(private flowbiteService: FlowbiteService) { }


  subcategoriesArr = computed(() => this.categoriesService.subcategoriesArr())
  categoriesArr = computed(() => this.categoriesService.categoriesArr())

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    this.getAllCategories()
  }


  getAllCategories() {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res);
        this.categoriesService.categoriesArr.set(res.data)
      }
    })
  }

  getAllSubcategoriesOfSpecificCategory(categoryId: string) {
    this.categoriesService.subcategoriesArr.set([])
    this.categoriesService.getAllSubcategoriesOfSpecificCategory(categoryId).subscribe({
      next: (res) => {
        console.log(res);
        this.categoriesService.subcategoriesArr.set(res.data)
      }
    })
  }


}

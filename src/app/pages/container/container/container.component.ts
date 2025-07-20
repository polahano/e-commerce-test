import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { NavbarComponent } from "../../../layouts/navbar/navbar.component";

@Component({
  selector: 'app-container',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss'
})
export class ContainerComponent {

}

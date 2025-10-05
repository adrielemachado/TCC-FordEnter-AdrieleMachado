import { Component } from '@angular/core';
import { HeaderComponent } from '../base/header/header.component';
import { FooterComponent } from '../base/footer/footer.component';
import { CardsComponent } from '../base/cards/cards.component';
// import { RouterLink } from "../../../../node_modules/@angular/router/router_module.d-Bx9ArA6K";

@Component({
  selector: 'app-homepage',
  imports: [HeaderComponent, FooterComponent, CardsComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}

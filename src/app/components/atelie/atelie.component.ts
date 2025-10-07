import { Component } from '@angular/core';
import { FooterComponent } from "../base/footer/footer.component";
import { HeaderLogadoComponent } from '../base/header-logado/header-logado.component';

@Component({
  selector: 'app-atelie',
  imports: [FooterComponent,HeaderLogadoComponent],
  templateUrl: './atelie.component.html',
  styleUrl: './atelie.component.css'
})
export class AtelieComponent {

}

import { Component } from '@angular/core';
import { FooterComponent } from "../base/footer/footer.component";
import { HeaderLogadoComponent } from '../base/header-logado/header-logado.component';

@Component({
  selector: 'app-atelie',
  standalone: true,
  imports: [HeaderLogadoComponent, FooterComponent],
  templateUrl: './atelie.component.html',
  styleUrls: ['./atelie.component.css']
})
export class AtelieComponent {

}

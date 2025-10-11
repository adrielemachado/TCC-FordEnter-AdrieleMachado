import { Component } from '@angular/core';
import { HeaderLogadoComponent } from '../base/header-logado/header-logado.component';
import { FooterComponent } from '../base/footer/footer.component';

@Component({
  selector: 'app-my-profile',
  imports: [HeaderLogadoComponent, FooterComponent],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent {
welcomeMessage: string = ''
}

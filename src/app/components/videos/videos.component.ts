import { Component } from '@angular/core';
import { FooterComponent } from "../base/footer/footer.component";
import { HeaderComponent } from '../base/header/header.component';

@Component({
  selector: 'app-videos',
  imports: [HeaderComponent,FooterComponent],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.css'
})
export class VideosComponent {

}

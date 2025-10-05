import { Component } from '@angular/core';
import { FooterComponent } from "../base/footer/footer.component";
import { HeaderComponent } from '../base/header/header.component';
import { CardsComponent } from '../base/cards/cards.component';
import { CardsChannelComponent } from '../base/cards-channel/cards-channel.component';

@Component({
  selector: 'app-videos',
  imports: [HeaderComponent,FooterComponent, CardsComponent, CardsChannelComponent],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.css'
})
export class VideosComponent {

}

import { CommonModule } from '@angular/common';
import { Component, Input} from '@angular/core';

import { VideoTutorial } from '../../../models/video.model';

@Component({
  selector: 'app-cards',
  imports: [CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {
  @Input() videoData!: VideoTutorial;
}

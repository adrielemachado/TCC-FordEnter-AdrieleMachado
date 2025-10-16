import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

import { VideoTutorial } from '../../../models/video.model';

@Component({
  selector: 'app-cards',
  imports: [CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {
  @Input() videoData!: VideoTutorial;
  @Input() showDelete: boolean = false;
  @Output() delete = new EventEmitter<string>();

  showMenu = false;

  toggleMenu(event: Event): void {
    event.stopPropagation(); // Impede que o clique no menu se propague para o card
    this.showMenu = !this.showMenu;
  }

  deleteVideo(event: Event): void {
    event.stopPropagation();
    this.delete.emit(this.videoData.videoId);
    this.showMenu = false; // Esconde o menu após a exclusão
  }
}

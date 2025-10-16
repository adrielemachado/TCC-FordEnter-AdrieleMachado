import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { VideoService } from '../../services/video.service';
import { CommonModule } from '@angular/common';
import { Video, VideoTutorial } from '../../models/video.model';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';
import { CardsComponent } from '../base/cards/cards.component';

@Component({
  selector: 'app-atelie',
  standalone: true,
  imports: [CommonModule, SafeUrlPipe, CardsComponent],
  templateUrl: './atelie.component.html',
  styleUrls: ['./atelie.component.css']
})
export class AtelieComponent implements OnInit {
  userName: string = '';
  savedVideos: VideoTutorial[] = []; 

  constructor(private authService: AuthService, private videoService: VideoService) {}

  ngOnInit(): void {
    this.userName = this.authService.getCurrentUserName();
    this.savedVideos = this.videoService.getSavedVideos();
  }

  removeVideoFromAtelie(videoId: string): void {
    this.videoService.removeVideo(videoId);
    this.savedVideos = this.videoService.getSavedVideos(); // Atualiza a lista local
  }
}

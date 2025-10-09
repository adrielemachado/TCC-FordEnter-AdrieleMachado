import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../../services/video.service';
import { VideoTutorial } from '../../../models/video.model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-keep-video',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './card-keep-video.component.html',
  styleUrl: './card-keep-video.component.css'
})
export class CardKeepVideoComponent implements OnInit {
  lastWatchedVideo: VideoTutorial | null = null;

  constructor(private videoService: VideoService, private router: Router) {}

  ngOnInit(): void {
    this.videoService.lastWatchedVideo$.subscribe((video: VideoTutorial | null) => {
      this.lastWatchedVideo = video;
    });
  }

  navigateToVideo(): void {
    if (this.lastWatchedVideo) {
      this.router.navigate(['/assistir-video', this.lastWatchedVideo.videoId]);
    }
  }

  clearLastWatched(): void {
    this.videoService.clearLastWatchedVideo();
  }
}

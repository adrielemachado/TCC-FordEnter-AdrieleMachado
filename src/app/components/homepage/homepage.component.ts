import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { VideoTutorial } from '../../models/video.model';
import { VideoService } from '../../services/video.service';
import { CardsComponent } from '../base/cards/cards.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CardsComponent, CommonModule, RouterLink],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit {
  videosIniciante: VideoTutorial[] = [];

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    this.videosIniciante = this.videoService.getBeginnerVideos();
  }
}
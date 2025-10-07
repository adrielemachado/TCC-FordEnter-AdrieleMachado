import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { VideoTutorial } from '../../models/video.model';
import { VideoService } from '../../services/video.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
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
  welcomeMessage: string = '';
  isUserLoggedIn: boolean = false;

  constructor(private videoService: VideoService, private authService: AuthService) {}

  ngOnInit(): void {
    this.videosIniciante = this.videoService.getBeginnerVideos();
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.isUserLoggedIn = true;
      if (currentUser.nome) {
        const firstName = currentUser.nome.split(' ')[0];
        this.welcomeMessage = `Olá, ${firstName}! Boas-vindas ao Amor em Fios!`;
      }
    }
  }
}
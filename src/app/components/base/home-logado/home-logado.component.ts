import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { VideoTutorial } from '../../../models/video.model';
import { VideoService } from '../../../services/video.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';
import { CardsComponent } from '../cards/cards.component';
import { CardKeepVideoComponent } from '../card-keep-video/card-keep-video.component';

@Component({
  selector: 'app-home-logado',
  standalone: true,
  imports: [CardsComponent, CommonModule, RouterLink, CardKeepVideoComponent],
  templateUrl: './home-logado.component.html',
  styleUrl: './home-logado.component.css'
})
export class HomeLogadoComponent implements OnInit, OnDestroy {
  videosIniciante: VideoTutorial[] = [];
  welcomeMessage: string = '';
  isUserLoggedIn: boolean = false;
  private userSubscription: Subscription | undefined;
  lastWatchedVideo$: Observable<VideoTutorial | null>;

  constructor(private videoService: VideoService, private authService: AuthService) {
    this.lastWatchedVideo$ = this.videoService.lastWatchedVideo$;
  }

  ngOnInit(): void {
    this.videosIniciante = this.videoService.getBeginnerVideos();
    this.userSubscription = this.authService.currentUser$.subscribe(user => {
      if (user && user.nome) {
        this.isUserLoggedIn = true;
        const firstName = user.nome.split(' ')[0];
        this.welcomeMessage = `Olá, ${firstName}! Boas-vindas ao Amor em Fios!`;
      } else if (user) {
        this.isUserLoggedIn = true;
        this.welcomeMessage = `Olá! Boas-vindas ao Amor em Fios!`;
      } else {
        this.isUserLoggedIn = false;
        this.welcomeMessage = '';
      }
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
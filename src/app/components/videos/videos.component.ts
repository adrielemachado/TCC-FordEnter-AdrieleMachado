import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FooterComponent } from "../base/footer/footer.component";
import { HeaderComponent } from '../base/header/header.component';
import { CardsComponent } from '../base/cards/cards.component';
import { VideoTutorial } from '../../models/video.model';
import { CommonModule, Location } from '@angular/common';
import { VideoService } from '../../services/video.service';
import { AuthService } from '../../services/auth.service';
import { HeaderLogadoComponent } from '../base/header-logado/header-logado.component';

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [CardsComponent, CommonModule, HeaderComponent, FooterComponent, HeaderLogadoComponent],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.css'
})
export class VideosComponent implements OnInit {

  video: VideoTutorial | undefined;
  videoUrlSegura: SafeResourceUrl | undefined;
  videosRelacionados: VideoTutorial[] = [];
  isSaved: boolean = false;
  isLoggedIn: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router,
    private location: Location,
    private videoService: VideoService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });

    this.route.paramMap.subscribe(params => {
      const videoId = params.get('videoId');
      if (videoId) {
        this.video = this.videoService.getVideoById(videoId);
      }

      if (this.video) {
        const url = `https://www.youtube.com/embed/${this.video.videoId}`;
        this.videoUrlSegura = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        this.videosRelacionados = this.videoService.getVideos()
          .filter(v => v.videoId !== this.video?.videoId)
          .slice(0, 3);

        // Initialize isSaved state
        this.isSaved = this.videoService.getSavedVideos().some(v => v.videoId === this.video?.videoId);

      } else {
        console.error('Vídeo não encontrado!');
        this.router.navigate(['/']);
      }
    });
  }

  toggleSaveState(): void {
    if (this.video) {
      if (this.isSaved) {
        this.videoService.removeVideo(this.video.videoId);
      } else {
        this.videoService.saveVideo(this.video);
      }
      this.isSaved = !this.isSaved;
    }
  }

  voltar(): void {
    this.location.back();
  }
}
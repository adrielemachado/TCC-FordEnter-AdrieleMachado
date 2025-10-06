import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FooterComponent } from "../base/footer/footer.component";
import { HeaderComponent } from '../base/header/header.component';
import { CardsComponent } from '../base/cards/cards.component';
import { VideoTutorial } from '../aulas/aulas.component';
import { CommonModule, Location } from '@angular/common';

const videoteca: VideoTutorial[] = [
  {
    id: 1,
    titulo: 'Lista de Materiais para Amigurumi',
    videoId: 'fbx0xL_dqA4',
    dificuldade: 'Iniciante',
    tecnica: 'Amigurumi',
    categoria: 'Amigurumi',
    channelName: 'Canal MariaRê',
    channelUrl: 'https://www.youtube.com/@ateliemariare'
  },
  {
    id: 2,
    titulo: 'Ponto Baixíssimo',
    videoId: 'zu1g9o2VyYg',
    dificuldade: 'Iniciante',
    tecnica: 'Amigurumi',
    categoria: 'Amigurumi',
    channelName: 'Canal MariaRê',
    channelUrl: 'https://www.youtube.com/@ateliemariare'
  },
  {
    id: 3,
    titulo: 'Como Fazer Correntinhas',
    videoId: 'n6KzkqUiHRo',
    dificuldade: 'Iniciante',
    tecnica: 'Amigurumi',
    categoria: 'Amigurumi',
    channelName: 'Canal MariaRê',
    channelUrl: 'https://www.youtube.com/@ateliemariare'
  },
  {
    id: 4,
    titulo: 'Coração de Crochê',
    videoId: 'gQA24NlM4q4',
    dificuldade: 'Iniciante',
    tecnica: 'Amigurumi',
    categoria: 'Amigurumi',
    channelName: 'Canal Amiguchos Arte em Crochê',
    channelUrl: 'https://www.youtube.com/@amiguchoscroche'
  },
  {
    id: 5,
    titulo: 'Filtro dos Sonhos',
    videoId: 'OqHikG_cnaY',
    dificuldade: 'Intermediário',
    tecnica: 'Crochê',
    categoria: 'Decoração',
    channelName: 'Canal Dazz Crochê',
    channelUrl: 'https://www.youtube.com/@dazzcroche'
  },
  {
    id: 6,
    titulo: 'Pulseira Zig-Zag',
    videoId: 'eSPRVEAPrHY',
    dificuldade: 'Iniciante',
    tecnica: 'Macramê',
    categoria: 'Vestuário',
    channelName: 'Canal ViajArte  Macrame - Tutoriais',
    channelUrl: 'https://www.youtube.com/@viajartemacrame'
  },
];

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CardsComponent, CommonModule],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.css'
})
export class VideosComponent implements OnInit {

  video: VideoTutorial | undefined;
  videoUrlSegura: SafeResourceUrl | undefined;
  videosRelacionados: VideoTutorial[] = [];

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const videoId = params.get('videoId');
      this.video = videoteca.find(v => v.videoId === videoId);

      if (this.video) {
        const url = `https://www.youtube.com/embed/${this.video.videoId}`;
        this.videoUrlSegura = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        this.videosRelacionados = videoteca.filter(v => v.videoId !== this.video?.videoId).slice(0, 3);
      } else {
        console.error('Vídeo não encontrado!');
        this.router.navigate(['/']);
      }
    });
  }

  voltar(): void {
    this.location.back();
  }
}
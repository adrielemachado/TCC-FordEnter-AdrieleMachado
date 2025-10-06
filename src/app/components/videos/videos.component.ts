import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../base/footer/footer.component";
import { HeaderComponent } from '../base/header/header.component';
import { CardsComponent } from '../base/cards/cards.component';
import { VideoTutorial } from '../aulas/aulas.component';

@Component({
  selector: 'app-videos',
  imports: [HeaderComponent,FooterComponent, CardsComponent],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.css'
})
export class VideosComponent implements OnInit {
  // Dados dos vídeos
  todosOsVideos: VideoTutorial[] = [ //array mock
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

  videosIniciante: VideoTutorial[] = [];

  ngOnInit(): void {
    this.videosIniciante = this.todosOsVideos.filter(video => video.id >= 1 && video.id <= 2);
  }
}

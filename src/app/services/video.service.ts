import { Injectable } from '@angular/core';
import { VideoTutorial } from '../components/aulas/aulas.component';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private videoteca: VideoTutorial[] = [
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

  constructor() { }

  getVideos(): VideoTutorial[] {
    return this.videoteca;
  }

  getVideoById(videoId: string): VideoTutorial | undefined {
    return this.videoteca.find(v => v.videoId === videoId);
  }

  getBeginnerVideos(): VideoTutorial[] {
    return this.videoteca.filter(video => video.id >= 1 && video.id <= 3);
  }
}

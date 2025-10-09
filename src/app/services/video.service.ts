import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { VideoTutorial } from '../models/video.model';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private currentUser: User | null = null;

  private videoteca: VideoTutorial[] = [
    {
      id: 1,
      titulo: 'Lista de Materiais para Amigurumi',
      videoId: 'fbx0xL_dqA4',
      dificuldade: 'Iniciante',
      tecnica: 'Amigurumi',
      categoria: 'Amigurumi',
      channelName: 'Canal Ateliê MariaRê',
      channelUrl: 'https://www.youtube.com/@ateliemariare'
    },
    {
      id: 2,
      titulo: 'Como Fazer Ponto Baixíssimo',
      videoId: 'zu1g9o2VyYg',
      dificuldade: 'Iniciante',
      tecnica: 'Amigurumi',
      categoria: 'Amigurumi',
      channelName: 'Canal Ateliê MariaRê',
      channelUrl: 'https://www.youtube.com/@ateliemariare'
    },
    {
      id: 3,
      titulo: 'Como Fazer Correntinhas',
      videoId: 'n6KzkqUiHRo',
      dificuldade: 'Iniciante',
      tecnica: 'Amigurumi',
      categoria: 'Amigurumi',
      channelName: 'Canal Ateliê MariaRê',
      channelUrl: 'https://www.youtube.com/@ateliemariare'
    },
    {
      id: 4,
      titulo: 'Como Fazer Coração de Crochê',
      videoId: 'gQA24NlM4q4',
      dificuldade: 'Iniciante',
      tecnica: 'Amigurumi',
      categoria: 'Amigurumi',
      channelName: 'Canal Amiguchos Arte em Crochê',
      channelUrl: 'https://www.youtube.com/@amiguchoscroche'
    },
    {
      id: 5,
      titulo: 'Como Fazer Filtro dos Sonhos',
      videoId: 'OqHikG_cnaY',
      dificuldade: 'Intermediário',
      tecnica: 'Crochê',
      categoria: 'Decoração',
      channelName: 'Canal Dazz Crochê',
      channelUrl: 'https://www.youtube.com/@dazzcroche'
    },
    {
      id: 6,
      titulo: 'Como Fazer Pulseira Zig-Zag',
      videoId: 'eSPRVEAPrHY',
      dificuldade: 'Iniciante',
      tecnica: 'Macramê',
      categoria: 'Vestuário',
      channelName: 'Canal ViajArte  Macrame - Tutoriais',
      channelUrl: 'https://www.youtube.com/@viajartemacrame'
    },
    {
      id: 7,
      titulo:'Como Fazer Mandala de Crochê',
      videoId:'mcp7xtMXflw',
      dificuldade:'Iniciante',
      tecnica: 'Crochê',
      categoria:'Decoração',
      channelName:'Ateliê Jéssica Brandão',
      channelUrl:'https://www.youtube.com/c/@ateliejessicabrandao'
    },
    {
      id: 8,
      titulo: 'Como Fazer Ponto Baixo',
      videoId: '1g5s9mB4C18',
      dificuldade: 'Iniciante',
      tecnica: 'Amigurumi',
      categoria: 'Amigurumi',
      channelName: 'Canal Ateliê MariaRê',
      channelUrl:'https://www.youtube.com/@ateliemariare'
    },
    {
      id: 9,
      titulo: 'Como Fazer Meio Ponto Alto',
      videoId: 'pQQ5L7uJeI8',
      dificuldade: 'Iniciante',
      tecnica: 'Amigurumi',
      categoria: 'Amigurumi',
      channelName: 'Canal Ateliê MariaRê',
      channelUrl:'https://www.youtube.com/@ateliemariare'
    },
    {
      id: 10,
      titulo:'Como Fazer Ponto Alto de Crochê',
      videoId:'RZE1qtNgXO8',
      dificuldade:'Iniciante',
      tecnica:'Amigurumi',
      categoria:'Amigurumi',
      channelName:'Canal Ateliê MariaRê',
      channelUrl:'https://www.youtube.com/@ateliemariare'
    },
    {
      id: 11,
      titulo:'Como Fazer Anel Mágico',
      videoId: 'A696TeYCxr0',
      dificuldade: 'Iniciante',
      tecnica:'Amigurumi',
      categoria:'Amigurumi',
      channelName:'Canal Ateliê MariaRê',
      channelUrl:'https://www.youtube.com/@ateliemariare'
    },
    {
      id: 12,
      titulo: 'Como Fazer Aumento e Diminuição de Crochê',
      videoId: 'XpybPivOFKw',
      dificuldade: 'Iniciante',
      tecnica: 'Amigurumi',
      categoria: 'Amigurumi',
      channelName: 'Canal Ateliê MariaRê',
      channelUrl:'https://www.youtube.com/@ateliemariare'
    }
  ];

  private savedVideos: VideoTutorial[] = [];
  private lastWatchedVideoSubject = new BehaviorSubject<VideoTutorial | null>(null);
  public lastWatchedVideo$ = this.lastWatchedVideoSubject.asObservable();

  constructor(private authService: AuthService) {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.loadSavedVideos();
      this.loadLastWatchedVideo();
    });
  }

  private getStorageKey(type: 'saved' | 'last_watched'): string | null {
    if (this.currentUser) {
      return `${type}_${this.currentUser.email}`;
    }
    return null;
  }

  private loadLastWatchedVideo() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const key = this.getStorageKey('last_watched');
      if (key) {
        const videoId = localStorage.getItem(key);
        if (videoId) {
          const video = this.getVideoById(videoId);
          this.lastWatchedVideoSubject.next(video || null);
        }
      }
    }
  }

  setLastWatchedVideoId(videoId: string) {
    if (typeof window !== 'undefined' && window.localStorage) {
      const key = this.getStorageKey('last_watched');
      if (key) {
        localStorage.setItem(key, videoId);
        const video = this.getVideoById(videoId);
        this.lastWatchedVideoSubject.next(video || null);
      }
    }
  }

  getLastWatchedVideoId(): string | null {
      if (typeof window !== 'undefined' && window.localStorage) {
      const key = this.getStorageKey('last_watched');
      if (key) {
        return localStorage.getItem(key);
      }
    }
    return null;
  }

  clearLastWatchedVideo() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const key = this.getStorageKey('last_watched');
      if (key) {
        localStorage.removeItem(key);
        this.lastWatchedVideoSubject.next(null);
      }
    }
  }

  private loadSavedVideos() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const key = this.getStorageKey('saved');
      if (key) {
        const storedVideos = localStorage.getItem(key);
        this.savedVideos = storedVideos ? JSON.parse(storedVideos) : [];
      } else {
        this.savedVideos = [];
      }
    }
  }

  private updateSavedVideosInLocalStorage() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const key = this.getStorageKey('saved');
      if (key) {
        localStorage.setItem(key, JSON.stringify(this.savedVideos));
      }
    }
  }

  getVideos(): VideoTutorial[] {
    return this.videoteca;
  }

  getVideoById(videoId: string): VideoTutorial | undefined {
    return this.videoteca.find(v => v.videoId === videoId);
  }

  getBeginnerVideos(): VideoTutorial[] {
    return this.videoteca.filter(video => video.id >= 1 && video.id <= 3);
  }

  saveVideo(video: VideoTutorial) {
    if (!this.savedVideos.some(v => v.videoId === video.videoId)) {
      this.savedVideos.push(video);
      this.updateSavedVideosInLocalStorage();
    }
  }

  getSavedVideos(): VideoTutorial[] {
    return this.savedVideos;
  }

  removeVideo(videoId: string) {
    this.savedVideos = this.savedVideos.filter(v => v.videoId !== videoId);
    this.updateSavedVideosInLocalStorage();
  }
}

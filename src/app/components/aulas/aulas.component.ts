import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../base/header/header.component';
import { FooterComponent } from '../base/footer/footer.component';
import { CardsComponent } from '../base/cards/cards.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface VideoTutorial {
  id: number;
  titulo: string;
  videoId: string;
  dificuldade: 'Iniciante' | 'Intermediário' | 'Avançado';
  tecnica: 'Crochê' | 'Macramê' | 'Amigurumi';
  categoria: 'Vestuário' | 'Amigurumi' | 'Decoração';
  channelName: string;
  channelUrl: string;
}


@Component({
  selector: 'app-aulas',
  imports: [HeaderComponent, CardsComponent, FooterComponent, FormsModule, CommonModule],
  templateUrl: './aulas.component.html',
  styleUrl: './aulas.component.css'
})
export class AulasComponent implements OnInit {

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

  videosFiltrados: VideoTutorial[] = [];
  mensagemFiltro: string = '';

  filtros = {
    dificuldade: 'Dificuldade',
    tecnica: 'Técnicas',
    categoria: 'Categorias'
  };

  constructor() { }

  ngOnInit(): void {
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    const { dificuldade, tecnica, categoria } = this.filtros;

    const dificuldadeSelecionada = dificuldade !== 'Dificuldade';
    const tecnicaSelecionada = tecnica !== 'Técnicas';
    const categoriaSelecionada = categoria !== 'Categorias';

    const totalFiltrosSelecionados = [dificuldadeSelecionada, tecnicaSelecionada, categoriaSelecionada].filter(Boolean).length;

    this.mensagemFiltro = '';

    if (totalFiltrosSelecionados > 0 && totalFiltrosSelecionados < 3) {
      this.mensagemFiltro = 'Por favor, selecione as três opções para refinar sua busca.';
      this.videosFiltrados = this.todosOsVideos; // Mostra todos enquanto seleciona
      return;
    }

    if (totalFiltrosSelecionados === 3) {
      this.videosFiltrados = this.todosOsVideos.filter(video =>
        video.dificuldade === dificuldade &&
        video.tecnica === tecnica &&
        video.categoria === categoria
      );

      if (this.videosFiltrados.length === 0) {
        this.mensagemFiltro = 'Ops! Nenhum vídeo encontrado com os filtros selecionados. Tente uma combinação diferente.';
      }
    } else {
      // Nenhum filtro selecionado (estado inicial)
      this.videosFiltrados = this.todosOsVideos;
    }
  }

  resetarFiltros(): void {
    this.filtros = {
      dificuldade: 'Dificuldade',
      tecnica: 'Técnicas',
      categoria: 'Categorias'
    };
    this.aplicarFiltros();
  }

}

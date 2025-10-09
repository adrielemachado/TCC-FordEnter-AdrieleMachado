import { Component, OnInit } from '@angular/core';
import { CardsComponent } from '../base/cards/cards.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VideoTutorial } from '../../models/video.model';
import { VideoService } from '../../services/video.service';


@Component({
  selector: 'app-aulas',
  standalone: true,
  imports: [CardsComponent, FormsModule, CommonModule],
  templateUrl: './aulas.component.html',
  styleUrl: './aulas.component.css'
})
export class AulasComponent implements OnInit {

  todosOsVideos: VideoTutorial[] = []; //array mock

  videosFiltrados: VideoTutorial[] = [];
  mensagemFiltro: string = '';

  filtros = {
    dificuldade: 'Dificuldade',
    tecnica: 'Técnicas',
    categoria: 'Categorias'
  };

  constructor(private videoService: VideoService) { }

  ngOnInit(): void {
    this.todosOsVideos = this.videoService.getVideos();
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

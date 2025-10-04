import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../base/header/header.component';
import { FooterComponent } from '../base/footer/footer.component';
import { CardsComponent } from '../base/cards/cards.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface Pesquisa {
  id: number;
  titulo: string;
  videoId: string;
  dificuldade: 'Iniciante' | 'Intermediário' | 'Avançado';
  tecnica: 'Crochê' | 'Tricô' | 'Macramê' | 'Amigurumi';
  categoria: 'Vestuário' | 'Amigurumi' | 'Decoração' | 'Jogo Americano';
}


@Component({
  selector: 'app-aulas',
  imports: [HeaderComponent, CardsComponent, FooterComponent, FormsModule, CommonModule],
  templateUrl: './aulas.component.html',
  styleUrl: './aulas.component.css'
})
export class AulasComponent  implements OnInit{

todosOsVideos: Pesquisa[] = [
    { id: 1, titulo: 'Como fazer correntinhas', videoId: 'n6KzkqUiHRo', dificuldade: 'Iniciante', tecnica: 'Crochê', categoria: 'Vestuário' },
    { id: 2, titulo: 'Bolsa de Macramê Fácil', videoId: 'exemplo_id_2', dificuldade: 'Iniciante', tecnica: 'Macramê', categoria: 'Decoração' },
    { id: 3, titulo: 'Polvo de Amigurumi', videoId: 'exemplo_id_3', dificuldade: 'Intermediário', tecnica: 'Amigurumi', categoria: 'Amigurumi' },
    // ... adicione todos os seus outros vídeos aqui
  ];

  videosFiltrados: Pesquisa[] = [];

  filtros = {
    dificuldade: 'Dificuldade',
    tecnica: 'Técnicas',
    categoria: 'Categorias'
  };

   constructor() { }

  ngOnInit(): void {
    this.videosFiltrados = this.todosOsVideos;
  }

  aplicarFiltros(): void {
    let videosTemp = this.todosOsVideos;

    if (this.filtros.dificuldade !== 'Dificuldade') {
      videosTemp = videosTemp.filter(video => video.dificuldade === this.filtros.dificuldade);
    }

    if (this.filtros.tecnica !== 'Técnicas') {
      videosTemp = videosTemp.filter(video => video.tecnica === this.filtros.tecnica);
    }

    if (this.filtros.categoria !== 'Categorias') {
      videosTemp = videosTemp.filter(video => video.categoria === this.filtros.categoria);
    }

    this.videosFiltrados = videosTemp;
  }
}



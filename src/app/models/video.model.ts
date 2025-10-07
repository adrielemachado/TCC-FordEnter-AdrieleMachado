export interface Video {
  id: string;
  title: string;
  url: string;
  // Add any other properties your video object might have
}

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
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AulasComponent } from './components/aulas/aulas.component';
import { VideosComponent } from './components/videos/videos.component';
import { AtelieComponent } from './components/atelie/atelie.component';

export const routes: Routes = [
    {path:'',component:LoginComponent},
    {path:'entrar',component:LoginComponent},
    {path:'cadastro',component:CadastroComponent},
    {path:'inicio',component:HomepageComponent},
    {path:'aulas-tutoriais',component:AulasComponent},
    { path: 'assistir-video/:videoId', component:VideosComponent},
    // Criar rota para a navegação entre a página de pesquisa e a página do vídeo (clicar no card)
    {path:'meu-atelie',component:AtelieComponent}
];

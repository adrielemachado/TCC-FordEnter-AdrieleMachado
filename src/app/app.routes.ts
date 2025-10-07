import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AulasComponent } from './components/aulas/aulas.component';
import { VideosComponent } from './components/videos/videos.component';
import { AtelieComponent } from './components/atelie/atelie.component';

export const routes: Routes = [
    { path: '', redirectTo: '/inicio', pathMatch: 'full' },
    {path:'login',component:LoginComponent},
    {path:'cadastro',component:CadastroComponent},
    {path:'inicio',component:HomepageComponent},
    {path:'aulas-tutoriais',component:AulasComponent},
    { path: 'assistir-video/:videoId', component:VideosComponent},
    {path:'meu-atelie',component:AtelieComponent}
];

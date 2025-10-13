import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';

import { AulasComponent } from './components/aulas/aulas.component';
import { VideosComponent } from './components/videos/videos.component';
import { AtelieComponent } from './components/atelie/atelie.component';
import { HomeLogadoComponent } from './components/base/home-logado/home-logado.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';

export const routes: Routes = [
    { path: '', component:LoginComponent, pathMatch: 'full' },
    {path:'cadastro',component:CadastroComponent},
    {path: 'welcome', component:HomeLogadoComponent},
    {path:'aulas-tutoriais',component:AulasComponent},
    { path: 'assistir-video/:videoId', component:VideosComponent},
    {path:'meu-atelie',component:AtelieComponent},
    {path:'meu-perfil',component:MyProfileComponent}
];

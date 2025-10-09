import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/base/header/header.component';
import { HeaderLogadoComponent } from './components/base/header-logado/header-logado.component';
import { FooterComponent } from './components/base/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HeaderComponent, HeaderLogadoComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'site-croche';
  isLoggedIn$: Observable<boolean>;
  showLayout: boolean = true;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;

    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Esconde o header e footer nas rotas de login e cadastro
      if (event.url === '/login' || event.url === '/cadastro') {
        this.showLayout = false;
      } else {
        this.showLayout = true;
      }

      // Redireciona para /home se o usuário estiver logado e na página inicial
      this.isLoggedIn$.pipe(take(1)).subscribe(isLoggedIn => {
        if (isLoggedIn && event.url === '/') {
          this.router.navigate(['/welcome']);
        }
      });
    });
  }
}

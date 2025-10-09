import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-logado',
  imports: [CommonModule, RouterLink],
  templateUrl: './header-logado.component.html',
  styleUrl: './header-logado.component.css'
})
export class HeaderLogadoComponent {

menuHamb: boolean = false;
  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  toggleMenu(): void {
    this.menuHamb = !this.menuHamb;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}





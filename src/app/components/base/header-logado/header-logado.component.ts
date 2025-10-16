import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-header-logado',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header-logado.component.html',
  styleUrl: './header-logado.component.css'
})
export class HeaderLogadoComponent {

  menuHamb: boolean = false;
  isLoggedIn$: Observable<boolean>;
  user$: Observable<User | null>;
  avatarUrl$: Observable<string>;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.user$ = this.authService.currentUser$;
    this.avatarUrl$ = this.user$.pipe(
      map(user => {
        if (user && user.name) {
          const firstLetter = user.name.charAt(0).toUpperCase();
          return `https://placehold.co/40x40/E1C4E9/4B0082?text=${firstLetter}`;
        }
        return 'assets/user-icon.png';
      })
    );
  }

  toggleMenu(): void {
    this.menuHamb = !this.menuHamb;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-header-logado',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header-logado.component.html',
  styleUrl: './header-logado.component.css'
})
export class HeaderLogadoComponent implements OnInit {

  menuHamb: boolean = false;
  isLoggedIn$: Observable<boolean>;
  user: User | null = null;
  avatarUrl: string = 'assets/user-icon.png';

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
      if (user && user.name) {
        const firstLetter = user.name.charAt(0).toUpperCase();
        this.avatarUrl = `https://placehold.co/40x40/E1C4E9/4B0082?text=${firstLetter}`;
      } else {
        this.avatarUrl = 'assets/user-icon.png'; // Fallback para o ícone padrão
      }
    });
  }

  toggleMenu(): void {
    this.menuHamb = !this.menuHamb;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}





import { Component } from '@angular/core';
import { FooterLoginComponent } from '../base/footer-login/footer-login.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FooterLoginComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {
    // Aqui iria a lógica de validação de usuário e senha
    this.authService.login();
    this.router.navigate(['/inicio']);
  }
}

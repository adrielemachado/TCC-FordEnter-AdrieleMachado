import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../base/footer/footer.component';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FooterComponent, RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit(): void {
    this.loginError = false;
    if (this.loginForm.invalid) {
      this.loginError = true;
      return;
    }

    const success = this.authService.login(this.loginForm.value);
    if (success) {
      this.router.navigate(['/inicio']);
    } else {
      this.loginError = true;
    }
  }

  showPassword = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}

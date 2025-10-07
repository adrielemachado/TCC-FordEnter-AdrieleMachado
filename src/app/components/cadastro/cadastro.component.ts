import { Component, OnInit } from '@angular/core';
import { FooterLoginComponent } from '../base/footer-login/footer-login.component';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent implements OnInit {
  registrationForm!: FormGroup;
  registrationError: string = '';
  isModalOpen: boolean = false;

  // Estado dos botões de seleção
  isAmigurumiSelected: boolean = false;
  isInicianteSelected: boolean = false;

  passwordRequirements = {
    length: false,
    uppercase: false,
    number: false,
    special: false
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      sobrenome: new FormControl('', [Validators.required]),
      nascimento: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$')]),
      lgpd: new FormControl(false, [Validators.requiredTrue])
    });

    this.registrationForm.get('password')?.valueChanges.subscribe(value => {
      if (value) {
        this.updatePasswordRequirements(value);
      }
    });
  }

  updatePasswordRequirements(password: string): void {
    this.passwordRequirements.length = password.length >= 6;
    this.passwordRequirements.uppercase = /[A-Z]/.test(password);
    this.passwordRequirements.number = /\d/.test(password);
    this.passwordRequirements.special = /[@$!%*?&]/.test(password);
  }

  onSubmit(): void {
    this.registrationError = '';
    if (this.registrationForm.valid) {
      const success = this.authService.register(this.registrationForm.value);
      if (success) {
        this.router.navigate(['/inicio']);
      } else {
        this.registrationError = 'Este e-mail já está cadastrado.';
      }
    }
  }

  toggleAmigurumi(): void {
    this.isAmigurumiSelected = !this.isAmigurumiSelected;
  }

  toggleIniciante(): void {
    this.isInicianteSelected = !this.isInicianteSelected;
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  showPassword = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}

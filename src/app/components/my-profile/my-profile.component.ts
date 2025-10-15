import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

// Validador customizado para verificar se as senhas coincidem
export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
  return password && confirmPassword && password !== confirmPassword ? { passwordMismatch: true } : null;
}

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent implements OnInit {
  isModalOpen = false;
  user: User | null = null;
  editingUser: Partial<User> = {};
  avatarUrl: string = '';
  accountSettingsForm: FormGroup;

  constructor(private authService: AuthService) {
    this.accountSettingsForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.minLength(6)]),
      confirmPassword: new FormControl('')
    }, { validators: passwordMatchValidator });
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
      if (this.user) {
        // Popula o formulário de configurações com os dados do usuário
        this.accountSettingsForm.patchValue({ email: this.user.email });

        // Gera a URL do avatar
        const firstLetter = this.user.name ? this.user.name.charAt(0).toUpperCase() : 'U';
        this.avatarUrl = `https://placehold.co/128x128/E1C4E9/4B0082?text=${firstLetter}`;

        // Inicializa a biografia e outras propriedades se não existirem
        if (!this.user.bio) {
          this.user.bio = 'Apaixonada por fios e cores. Transformo linhas em arte e afeto. Bem-vindo(a) ao meu cantinho!';
        }
        if (!this.user.skills) {
          this.user.skills = ['Amigurumi'];
        }
        if (!this.user.knowledgeLevel) {
          this.user.knowledgeLevel = 'Iniciante';
        }
      }
    });
  }

  openModal(): void {
    if (this.user) {
      this.editingUser = { ...this.user, skills: [...(this.user.skills || [])] };
      this.isModalOpen = true;
    }
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  // Salva as alterações do modal (nome, bio, etc)
  saveChanges(): void {
    if (this.editingUser) {
      this.authService.updateUserProfile(this.editingUser);
      this.closeModal();
    }
  }

  // Salva as alterações do formulário de configurações (email, senha)
  onAccountSettingsSubmit(): void {
    if (this.accountSettingsForm.valid) {
      const updatedData: Partial<User> = {
        email: this.accountSettingsForm.value.email
      };

      // Apenas inclui a senha se ela foi preenchida
      if (this.accountSettingsForm.value.password) {
        updatedData.password = this.accountSettingsForm.value.password;
      }

      this.authService.updateUserProfile(updatedData);
      // Opcional: mostrar uma mensagem de sucesso
      alert('Configurações de conta salvas com sucesso!');
    }
  }

  isSkillSelected(skill: string): boolean {
    return this.editingUser.skills?.includes(skill) ?? false;
  }

  onSkillChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const skill = input.value;
    const isChecked = input.checked;

    if (!this.editingUser.skills) {
      this.editingUser.skills = [];
    }

    if (isChecked) {
      this.editingUser.skills.push(skill);
    } else {
      const index = this.editingUser.skills.indexOf(skill);
      if (index > -1) {
        this.editingUser.skills.splice(index, 1);
      }
    }
  }
}

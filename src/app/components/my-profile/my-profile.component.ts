import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent implements OnInit {
  isModalOpen = false;
  user: User | null = null;
  editingUser: Partial<User> = {};
  avatarUrl: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
      if (this.user) {
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
      // Cria uma cópia profunda para edição, especialmente para o array de skills
      this.editingUser = {
         ...this.user, 
         skills: [...(this.user.skills || [])]
        };
      this.isModalOpen = true;
    }
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  saveChanges(): void {
    if (this.editingUser) {
      this.authService.updateUserProfile(this.editingUser);
      this.closeModal();
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

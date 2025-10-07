import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer-login.component.html',
  styleUrl: './footer-login.component.css'
})
export class FooterLoginComponent {
  isModalOpen = false;

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
}

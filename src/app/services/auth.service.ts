import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model'; // Supondo que criaremos este modelo

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly isLoggedIn = new BehaviorSubject<boolean>(false);
  readonly isLoggedIn$ = this.isLoggedIn.asObservable();

  // Mock array de usuários
  private users: User[] = [
    { email: 'usuario@email.com', password: '123456' }
  ];

  login(credentials: Pick<User, 'email' | 'password'>): boolean {
    const user = this.users.find(u => u.email === credentials.email && u.password === credentials.password);
    if (user) {
      this.isLoggedIn.next(true);
      return true;
    }
    return false;
  }

  register(user: User): boolean {
    const userExists = this.users.find(u => u.email === user.email);
    if (userExists) {
      return false; // Usuário já existe
    }
    this.users.push(user);
    // Loga automaticamente o usuário após o cadastro
    return this.login({ email: user.email, password: user.password });
  }

  logout() {
    this.isLoggedIn.next(false);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly isLoggedIn = new BehaviorSubject<boolean>(false);
  readonly isLoggedIn$ = this.isLoggedIn.asObservable();

  private readonly currentUser = new BehaviorSubject<User | null>(null);
  readonly currentUser$ = this.currentUser.asObservable();

  private users: User[] = [];

  constructor() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedUsers = localStorage.getItem('users');
      if (storedUsers) {
        this.users = JSON.parse(storedUsers);
      } else {
        this.users = [{
          name: 'Usuário', 
          lastName: 'Teste', 
          email: 'usuario@email.com', 
          password: 'Password@1', 
          skills: ['Amigurumi'], 
          knowledgeLevel: 'Iniciante' 
        }];
        this.updateUsersInLocalStorage();
      }

      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        this.currentUser.next(JSON.parse(storedUser));
        this.isLoggedIn.next(true);
      }
    }
  }

  private updateUsersInLocalStorage() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }

  login(credentials: Pick<User, 'email' | 'password'>): boolean {
    const user = this.users.find(u => u.email === credentials.email && u.password === credentials.password);
    if (user) {
      this.isLoggedIn.next(true);
      this.currentUser.next(user);
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
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
    this.updateUsersInLocalStorage();
    // Loga automaticamente o usuário após o cadastro
    return this.login({ email: user.email, password: user.password });
  }

  logout() {
    this.isLoggedIn.next(false);
    this.currentUser.next(null);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('currentUser');
    }
  }

  getCurrentUser(): User | null {
    return this.currentUser.value;
  }

  getCurrentUserName(): string {
    const user = this.currentUser.value;
    return user && user.name ? user.name : 'Usuário';
  }

  updateUserProfile(updatedData: Partial<User>) {
    const currentUser = this.currentUser.value;
    if (!currentUser) return;

    // Mescla os dados atualizados com o usuário atual
    const updatedUser = { ...currentUser, ...updatedData };

    // Atualiza o BehaviorSubject para que a UI reaja imediatamente
    this.currentUser.next(updatedUser);

    // Atualiza a lista de usuários principal
    const userIndex = this.users.findIndex(u => u.email === currentUser.email);
    if (userIndex > -1) {
      this.users[userIndex] = updatedUser;
    }

    // Persiste as alterações no localStorage
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      this.updateUsersInLocalStorage();
    }
  }

  deleteAccount(): void {
    const currentUser = this.currentUser.value;
    if (!currentUser) return;

    const userIndex = this.users.findIndex(u => u.email === currentUser.email);
    if (userIndex > -1) {
      this.users.splice(userIndex, 1);
      this.updateUsersInLocalStorage();
    }

    this.logout();
  }
}

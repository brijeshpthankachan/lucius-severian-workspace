import { Injectable, signal, computed } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = signal<User | null>(null);

  readonly user = computed(() => this.currentUser());
  readonly isAuthenticated = computed(() => !!this.currentUser());

  constructor() {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.currentUser.set(JSON.parse(savedUser));
    }
  }

  login(username: string) {
    // Mock login
    const user: User = {
      id: '1',
      username: username,
      email: `${username.toLowerCase()}@example.com`,
      avatarUrl: `https://ui-avatars.com/api/?name=${username}&background=random`
    };
    this.currentUser.set(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    this.currentUser.set(null);
    localStorage.removeItem('user');
  }
}

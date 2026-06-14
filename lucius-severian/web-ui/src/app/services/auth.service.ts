import { Injectable, signal, computed, inject } from '@angular/core';
import { User } from '../models/user';
import { AnalyticsService } from './analytics.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = signal<User | null>(null);
  private analytics = inject(AnalyticsService);

  readonly user = computed(() => this.currentUser());
  readonly isAuthenticated = computed(() => !!this.currentUser());

  constructor() {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      this.currentUser.set(user);
      this.analytics.trackEvent('session_restore', { username: user.username });
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
    this.analytics.trackEvent('login', { username: user.username });
  }

  logout() {
    const user = this.currentUser();
    if (user) {
      this.analytics.trackEvent('logout', { username: user.username });
    }
    this.currentUser.set(null);
    localStorage.removeItem('user');
  }
}

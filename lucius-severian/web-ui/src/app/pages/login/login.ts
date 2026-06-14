import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  username = signal('');
  password = signal(''); // Not used but good for UI
  isLoading = signal(false);

  onSubmit() {
    if (!this.username()) return;

    this.isLoading.set(true);
    // Simulate API delay
    setTimeout(() => {
      this.authService.login(this.username());
      this.isLoading.set(false);
      this.router.navigate(['/']);
    }, 1000);
  }
}

import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


interface BackendUser {
  nombre: string;
  email: string;
  password: string;
  rol: 'profe' | 'alumno';
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  nombre: string = '';
  email: string = '';
  password: string = '';
  rol: 'student' | 'teacher' = 'student';
  isLoading = false;
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (!this.nombre || !this.email || !this.password) {
      this.errorMessage = 'Please fill all fields';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    const backendUser: BackendUser = {
      nombre: this.nombre,
      email: this.email,
      password: this.password,
      rol: this.rol === 'teacher' ? 'profe' : 'alumno'
    };

    this.authService.register(backendUser).subscribe({
      next: (res) => {
        console.log('Registration successful:', res);
        this.router.navigate(['/landingpage']);
      },
      error: (err) => {
        console.error('Registration error:', err);
        this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}

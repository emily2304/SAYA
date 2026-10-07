import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  showPassword = false;
  errorMessage: string | null = null;

  constructor(private router: Router, private authService: AuthService, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    // Limpiar el mensaje de error si el usuario empieza a escribir nuevamente
    this.loginForm.valueChanges.subscribe(() => {
      this.errorMessage = null;
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: user => {
        console.log('Logged in user:', user);

        const rol = String(user.rol).toLowerCase().trim();

        if (rol === 'profesor' || rol === 'profe') {
          this.router.navigate(['/principal/professor-groups']);
        } else if (rol === 'alumno' || rol === 'estudiante') {
          this.router.navigate(['/principal/student-main']);
        } else {
          console.warn('Rol no reconocido:', rol);
        }
      },
      error: err => {
        console.error('Error al iniciar sesión:', err);
        this.errorMessage = 'Correo o contraseña incorrectos. Por favor, inténtalo de nuevo.';
      }
    });
  }
}

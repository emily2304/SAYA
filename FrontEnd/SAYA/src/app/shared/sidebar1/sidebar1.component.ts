import { Component, EventEmitter, Output  } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar1.component.html',
  styleUrl: './sidebar1.component.scss'
})

export class Sidebar1Component {
  @Output() navigate = new EventEmitter<string>();

  constructor(private router: Router) {}

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }

  goToMain() {
    this.router.navigate(['/principal/professor-groups']);
  }

  goToAI() {
    this.router.navigate(['/principal/ai-assistant-prof']);
  }

  goToTranscription() {
    this.router.navigate(['/principal/transcription-professor']);
  }

  goToAfiches() {
    this.router.navigate(['/principal/posters-prof']);
  }

  goToCuestionarios() {
    this.router.navigate(['/principal/cuestionarios-p']);
  }

  logout() {
    this.router.navigate(['/landing']);
  }
}

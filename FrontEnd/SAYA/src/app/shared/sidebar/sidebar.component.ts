import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Output() navigate = new EventEmitter<string>();

  protected items : number[] = [100];

  constructor(private router: Router) {}

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }

  goToMain() {
    this.router.navigate(['/principal/student-main']);
  }

  goToAI() {
    this.router.navigate(['/principal/ai-assistant']);
  }

  goToTranscription() {
    this.router.navigate(['/principal/transcription']);
  }

  goToAfiches() {
    this.router.navigate(['/principal/posters-estd']);
  }

  goToCuestionarios() {
    this.router.navigate(['/principal/cuestionarios-e']);
  }

  goToStudyRoom() {
    this.router.navigate(['/principal/study-room']);
  }

  logout() {
    this.router.navigate(['/landing']);
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { Router } from '@angular/router';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-ai-assistant',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SidebarComponent
  ],
  templateUrl: './ai-assistant.component.html',
  styleUrls: ['./ai-assistant.component.scss']
})
export class AiAssistantComponent {
  messages: { text: string; sender: 'user' | 'ai' }[] = [
    { text: '¡Hola! Soy SayA, tu asistente de IA. ¿En qué puedo ayudarte hoy?', sender: 'ai' }
  ];
  newMessage = '';

  constructor(private router: Router, private chatService: ChatService) {}

  sendMessage() {
    const prompt = this.newMessage.trim();
    if (!prompt) return;

    // Agrega el mensaje del usuario
    this.messages.push({ text: prompt, sender: 'user' });

    // Limpia el input
    this.newMessage = '';

    // Llama al servicio
    this.chatService.sendPrompt(prompt).subscribe({
      next: (res) => {
        this.messages.push({ text: res.response, sender: 'ai' });
      },
      error: (err) => {
        console.error('Error del asistente:', err);
        this.messages.push({ text: 'Lo siento, ocurrió un error al contactar con la IA.', sender: 'ai' });
      }
    });
  }

  // Métodos de navegación
  goToAI() {
    this.router.navigate(['/principal/ai-assistant']);
  }

  goToTranscription() {
    this.router.navigate(['/principal/transcription']);
  }

  goToStudyRoom() {
    this.router.navigate(['/principal/study-room']);
  }

  logout() {
    this.router.navigate(['/landing']);
  }
}

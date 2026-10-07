import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { ForoService } from '../../services/foro.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';

interface Post {
  id: number;
  author: string;
  isProfessor: boolean;
  date: Date;
  message: string;
  attachment?: { name: string; url: string };
  replies: Reply[];
}

interface Reply {
  id: number;
  author: string;
  isProfessor: boolean;
  date: Date;
  message: string;
  attachment?: { name: string; url: string };
}

@Component({
  selector: 'app-student-foro',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, HttpClientModule],
  templateUrl: './study-room.component.html',
  styleUrl: './study-room.component.scss'
})
export class StudyRoomComponent implements OnInit {
  announcements: any[] = [];
    newAnnouncement = '';
    selectedFile: File | null = null;

    foroId: string = '6832a32bf161e6012d55ebcc';
    emisorId: string = localStorage.getItem('userId') || '';


    constructor(private foroService: ForoService) {}

    ngOnInit(): void {
      this.loadAnnouncements();
    }

    loadAnnouncements() {
      this.foroService.obtenerMensajes(this.foroId).subscribe(mensajes => {
        this.announcements = mensajes.map((msg: any) => ({
          id: msg._id,
          date: new Date(msg.fecha),
          message: msg.contenido,
          attachment: null
        }));
      });
    }

    postAnnouncement() {
      if (!this.newAnnouncement.trim()) return;

      const mensaje = {
        emisorId: this.emisorId,
        contenido: this.newAnnouncement
      };

      this.foroService.agregarMensaje(this.foroId, mensaje).subscribe(() => {
        this.newAnnouncement = '';
        this.selectedFile = null;
        this.loadAnnouncements();
      });
    }

    deleteAnnouncement(id: number) {
      this.announcements = this.announcements.filter(a => a.id !== id);
    }

    onFileSelected(event: any) {
      this.selectedFile = event.target.files[0];
    }

    removeFile() {
      this.selectedFile = null;
    }
  }

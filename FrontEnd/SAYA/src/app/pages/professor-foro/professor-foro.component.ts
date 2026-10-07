import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Sidebar1Component } from '../../shared/sidebar1/sidebar1.component';
import { ForoService } from '../../services/foro.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

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
  selector: 'app-professor-foro',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar1Component, HttpClientModule],
  templateUrl: './professor-foro.component.html',
  styleUrl: './professor-foro.component.scss'
})
export class ProfessorForoComponent implements OnInit {
  announcements: any[] = [];
    newAnnouncement = '';
    selectedFile: File | null = null;
    foroId: string = '6608d9f3d9a8712a05c4f201';
    emisorId: string = localStorage.getItem('userId') || '';


  constructor(private foroService: ForoService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const grupoId = params.get('grupoId');
      if (grupoId) {
        this.foroService.getForoByGrupo(grupoId).subscribe((foro: any) => {
          this.foroId = foro._id;
          this.loadAnnouncements();
        });
      }
    });
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

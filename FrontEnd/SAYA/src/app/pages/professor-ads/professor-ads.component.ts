import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Sidebar1Component } from '../../shared/sidebar1/sidebar1.component';
import { ForoService } from '../../services/foro.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-professor-ads',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar1Component, HttpClientModule],
  templateUrl: './professor-ads.component.html',
  styleUrls: ['./professor-ads.component.scss']
})
export class ProfessorAdsComponent implements OnInit {
  announcements: any[] = [];
  newAnnouncement = '';
  selectedFile: File | null = null;

  foroId: string = '68265912f6b9d80c9c315b8e';
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

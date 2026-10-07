import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar1Component } from '../../shared/sidebar1/sidebar1.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFileAlt, faPlusCircle, faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';

interface AficheInfo {
  id: string;
  titulo: string;
  createdAt: Date;
}
@Component({
  selector: 'app-professor-files',
  standalone: true,
  imports: [CommonModule, Sidebar1Component, FontAwesomeModule, FormsModule],
  templateUrl: './professor-files.component.html',
  styleUrl: './professor-files.component.scss'
})

export class ProfessorFilesComponent implements OnInit {
  faDownload = faDownload;
  faFileAlt = faFileAlt;
  faEye = faEye;
  faTrashAlt = faTrashAlt;
  grupoId: string = '';
  afiches: any[] = [];
  errorMessage: string = '';
  successMessage: string = '';
  showConfirmationDelete: boolean = false;
  aficheToDeleteId: string = '';
  fileToDeleteName: string = '';
  isDeleting: boolean = false;

  constructor(
    private archivoService: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.grupoId = params['grupoId'] || '';

      if (this.grupoId) {
        this.loadAfiches(this.grupoId);
      } else {
        this.errorMessage = 'No se encontró el ID del grupo.';
        this.afiches = []; // 🔒 Evitar errores en el HTML
      }
    });
  }


  loadAfiches(grupoId: string): void {
    if (!grupoId) {
      this.errorMessage = 'ID de grupo no válido';
      return;
    }

    this.archivoService.getAfichesByGrupo(grupoId).subscribe({
      next: (data) => {
        // Verificar y normalizar los IDs
        this.afiches = (Array.isArray(data) ? data.map(afiche => ({
          ...afiche,
          id: afiche._id || afiche.id // Normalizar a 'id'
        })) : []);
      },
      error: (err) => {
        console.error('Error:', err);
        this.errorMessage = 'Error al cargar afiches';
      }
    });
  }

  viewAfiche(afiche: any): void {
    const aficheId = afiche._id || afiche.id;
    const titulo = afiche.titulo || 'afiche';

    if (!aficheId) {
      this.errorMessage = 'El afiche no tiene un ID válido';
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';

    // Primero intentamos descargar el PDF
    this.archivoService.downloadAfiche(aficheId).subscribe({
      next: (pdfBlob: Blob) => {
        const blobUrl = window.URL.createObjectURL(pdfBlob);
        window.open(blobUrl, '_blank');
        setTimeout(() => window.URL.revokeObjectURL(blobUrl), 100);
      },
      error: (downloadError) => {
        console.error('Error al descargar PDF:', downloadError);

        // Si falla la descarga, obtenemos la información del afiche
        this.archivoService.getAficheInfo(aficheId).subscribe({
          next: (aficheInfo: any) => {
            // Mostrar información alternativa
            this.errorMessage = `No se pudo cargar el PDF. ${aficheInfo?.conceptos_clave?.join(', ') || 'Información disponible'}`;

            // Opcional: Mostrar detalles en un modal o consola
            console.log('Información del afiche:', aficheInfo);
          },
          error: (infoError) => {
            console.error('Error al obtener info:', infoError);
            this.errorMessage = 'No se pudo obtener información del afiche';
          }
        });
      }
    });
  }

  cancelDelete(): void {
    this.showConfirmationDelete = false;
    this.aficheToDeleteId = '';
    this.fileToDeleteName = '';
  }

  confirmDeleteAfiche(id: string, titulo: string): void {
    if (!id) {
      console.error('ID de afiche no proporcionado');
      return;
    }

    this.aficheToDeleteId = id;
    this.fileToDeleteName = titulo || 'Afiche sin nombre';
    this.showConfirmationDelete = true;
  }

  deleteAfiche(): void {
    if (!this.aficheToDeleteId) {
      this.errorMessage = 'No se ha seleccionado ningún afiche para eliminar';
      return;
    }

    this.isDeleting = true;

    this.archivoService.eliminarAfiche(this.aficheToDeleteId).subscribe({
      next: () => {
        // Actualizar lista local sin recargar desde el servidor
        this.afiches = this.afiches.filter(a => a._id !== this.aficheToDeleteId);
        this.successMessage = `"${this.fileToDeleteName}" eliminado correctamente`;
        this.resetDeleteModal();
      },
      error: (err) => {
        console.error('Error eliminando afiche:', err);
        this.errorMessage = err.error?.message ||
                          'Error al eliminar el afiche. Por favor intente nuevamente.';
        this.resetDeleteModal();
      }
    });
  }

  private resetDeleteModal(): void {
    this.isDeleting = false;
    this.showConfirmationDelete = false;
    this.aficheToDeleteId = '';
    this.fileToDeleteName = '';
  }
}

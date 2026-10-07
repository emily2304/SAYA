import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFileAlt, faPlusCircle, faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';

interface FileInfo {
  id: number;
  name: string;
  size: string;
  uploadDate: Date;
}

@Component({
  selector: 'app-student-create-afiche',
  standalone: true,
  imports: [CommonModule, SidebarComponent, FontAwesomeModule, FormsModule],
  templateUrl: './student-create-afiche.component.html',
  styleUrl: './student-create-afiche.component.scss'
})

export class StudentCreateAficheComponent implements OnInit {
  files: FileInfo[] = [];
  showConfirmationDelete: boolean = false;
  fileToDeleteId: number | null = null;
  fileToDeleteName: string = ''
  isDeleting: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  newFile: File | null = null; // Para la funcionalidad de agregar archivos
  isUploading: boolean = false;

  // Iconos de Font Awesome
  faFileAlt = faFileAlt;
  faPlusCircle = faPlusCircle;
  faTrashAlt = faTrashAlt;
  faEye = faEye;

  constructor() { }

  ngOnInit(): void {
    this.loadFiles(); // Simula la carga de la lista de archivos
  }

  loadFiles() {
    setTimeout(() => {
      this.files = [
        { id: 1, name: 'tarea1.pdf', size: '2.1 MB', uploadDate: new Date('2025-05-01') },
        { id: 2, name: 'guia_examen.pdf', size: '870 KB', uploadDate: new Date('2025-04-25') },
        { id: 3, name: 'presentacion_clase.pdf', size: '15.5 MB', uploadDate: new Date('2025-05-05') }
      ];
    }, 500);
  }

  viewFile(fileId: number) {
    // Lógica para ver el archivo (probablemente abrir una nueva pestaña o mostrar una vista previa)
    console.log(`Ver archivo con ID: ${fileId}`);
    // En una aplicación real, podrías usar window.open('URL_DEL_ARCHIVO')
  }

  confirmDeleteFile(fileId: number, fileName: string) { // Recibe el nombre del archivo
    this.fileToDeleteId = fileId;
    this.fileToDeleteName = fileName; // Almacena el nombre
    this.showConfirmationDelete = true;
  }

  cancelDeleteFile() {
    this.fileToDeleteId = null;
    this.showConfirmationDelete = false;
  }

  deleteFile() {
    if (this.fileToDeleteId !== null) {
      this.isDeleting = true;
      this.errorMessage = '';
      this.successMessage = '';
      // Simula la llamada al servicio para eliminar el archivo por su ID
      setTimeout(() => {
        this.isDeleting = false;
        const success = true; // Reemplaza con el resultado real de la API
        if (success) {
          this.files = this.files.filter(file => file.id !== this.fileToDeleteId);
          this.successMessage = 'Archivo eliminado exitosamente.';
          setTimeout(() => this.successMessage = '', 3000);
        } else {
          this.errorMessage = 'Error al eliminar el archivo.';
          setTimeout(() => this.errorMessage = '', 3000);
        }
        this.showConfirmationDelete = false;
        this.fileToDeleteId = null;
      }, 1000);
    }
  }

  onFileSelected(event: any) {
    this.newFile = event.target.files[0];
  }

  uploadFile() {
    if (this.newFile) {
      const fileToUpload = this.newFile; // Almacena el valor en una variable local
      this.isUploading = true;
      this.errorMessage = '';
      this.successMessage = '';
      // Simula la llamada al servicio para subir el archivo
      setTimeout(() => {
        this.isUploading = false;
        const success = true; // Reemplaza con el resultado real de la API
        if (success) {
          this.successMessage = `Archivo "${fileToUpload.name}" subido exitosamente.`; // Usa la variable local
          this.loadFiles(); // Recargar la lista de archivos
          this.newFile = null; // Limpiar el input de archivo
          setTimeout(() => this.successMessage = '', 3000);
        } else {
          this.errorMessage = 'Error al subir el archivo.';
          setTimeout(() => this.errorMessage = '', 3000);
        }
      }, 2000);
    } else {
      this.errorMessage = 'Por favor, selecciona un archivo para subir.';
      setTimeout(() => this.errorMessage = '', 3000);
    }
  }
}

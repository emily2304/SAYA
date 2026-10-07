import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { saveAs } from 'file-saver';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Nl2brPipe } from '../../shared/nl2br.pipe';
import { ApiService } from '../../services/api.service';
import { Archivo } from '../../interfaces/models';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-transcription',
  standalone: true,
    imports: [CommonModule, SidebarComponent, ReactiveFormsModule, Nl2brPipe],
  templateUrl: './transcription.component.html',
  styleUrls: ['./transcription.component.scss']

})
export class TranscriptionComponent implements OnInit {
  uploadForm: FormGroup;
    transcriptionForm: FormGroup;
    chatForm: FormGroup;
    grupoId: string | null = null;
    usuarioId: string = '';
    archivos: any[] = [];
    transcripciones: any[] = [];
    selectedFile: any = null;
    selectedTranscription: any = null;
    isLoading = false;
    showChatSection = false;
    chatResponse = '';
    chatMode: 'resumen' | 'afiche' | 'glosario' = 'resumen';

    constructor(
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private apiService: ApiService
    ) {
      this.uploadForm = this.fb.group({
        archivo: [null, Validators.required]
      });

      this.transcriptionForm = this.fb.group({
        archivoId: ['', Validators.required]
      });

      this.chatForm = this.fb.group({
        provider: ['deepseek']
      });
    }

    ngOnInit(): void {
      this.grupoId = this.route.snapshot.paramMap.get('grupoId') || '';
      this.usuarioId = localStorage.getItem('userId') || '';

      if (!this.usuarioId) {
        console.error('ID de usuario no disponible');
        alert('No se pudo identificar al usuario');
        return;
      }

      this.cargarArchivos();
      this.cargarTranscripciones();
    }

    onFileSelected(event: any): void {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
      }
    }

    cargarArchivos(): void {
    this.apiService.obtenerArchivosPorUsuario(this.usuarioId).subscribe({
      next: (data: any) => {
        this.archivos = data;
      },
      error: (error) => {
        console.error('Error al cargar archivos:', error);
        alert('Error al cargar archivos. Por favor recarga la página.');
      }
    });
  }

    cargarTranscripciones(): void {
      this.apiService.obtenerTranscripcionesPorUsuario(this.usuarioId).subscribe({
        next: (data: any) => {
          this.transcripciones = data;
        },
        error: (error) => {
          console.error('Error al cargar transcripciones:', error);
          alert('Error al cargar transcripciones. Por favor recarga la página.');
        }
      });
    }


    subirArchivo(): void {
      if (!this.selectedFile) {
        alert('Por favor selecciona un archivo MP3');
        return;
      }

      const id = localStorage.getItem('userId');
      console.log(id);
      if (id){
        this.usuarioId = id;
        const formData = new FormData();
        formData.append('archivo', this.selectedFile);
        formData.append('usuarioId', this.usuarioId);

        this.isLoading = true;
        this.apiService.subirArchivoMP3(formData).subscribe({
          next: (response: Archivo) => {
            this.isLoading = false;
            console.log(response);
            alert('Archivo subido correctamente');
            this.cargarArchivos();
            this.selectedFile = null;
            this.uploadForm.reset();
          },
          error: (error) => {
            this.isLoading = false;
            console.error('Error al subir archivo:', error);
            alert(`Error: ${error.error?.message || 'Error desconocido'}`);
          }
        });
      }

    }

    transcribirArchivo(): void {
      const archivoId = this.transcriptionForm.get('archivoId')?.value;
      if (!archivoId) {
        alert('Por favor selecciona un archivo');
        return;
      }

      this.isLoading = true;
      this.apiService.transcribirArchivo(archivoId).subscribe({
        next: (response: any) => {
          this.isLoading = false;
          alert('Transcripción completada');
          this.cargarTranscripciones();
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Error al transcribir archivo:', error);
          alert('Error al transcribir archivo');
        }
      });
    }

    seleccionarTranscripcion(transcripcion: any): void {
      this.selectedTranscription = transcripcion;
      this.showChatSection = true;
    }

    enviarConsulta(): void {
      if (!this.selectedTranscription) {
        alert('Por favor selecciona una transcripción');
        return;
      }

      const provider = this.chatForm.get('provider')?.value;
      this.isLoading = true;
      let apiCall;

      switch (this.chatMode) {
        case 'resumen':
          apiCall = this.apiService.generarResumen(
            this.selectedTranscription._id,
            `Genera un resumen conciso del siguiente texto: ${this.selectedTranscription.transcripcion}`,
            provider
          );
          break;
        case 'afiche':
          apiCall = this.apiService.generarAfiche(
            this.selectedTranscription._id,
            `Genera un afiche informativo basado en este contenido: ${this.selectedTranscription.transcripcion}`,
            provider
          );
          break;
        case 'glosario':
        default:
          apiCall = this.apiService.generarResumen(
            this.selectedTranscription._id,
            `Extrae los conceptos clave y genera un glosario de términos importantes de este texto: ${this.selectedTranscription.transcripcion}`,
            provider
          );
          break;
      }

      apiCall.subscribe({
        next: (response: any) => {
          this.isLoading = false;
          this.chatResponse = response.response || JSON.stringify(response, null, 2);
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Error al procesar consulta:', error);
          alert('Error al procesar consulta');
        }
      });
    }

    descargarResultado(): void {
      if (!this.chatResponse) return;

      const doc = new jsPDF();
      const textLines = this.docTextWrap(this.chatResponse, 180); // 180 mm ancho útil

      doc.setFontSize(12);
      doc.text(textLines, 10, 10); // desde coordenadas (10,10)

      const nombreArchivo = `${this.selectedTranscription?.nombreArchivo || 'resultado'}-${this.chatMode}.pdf`;
      doc.save(nombreArchivo);
    }

    // Función auxiliar para ajustar texto largo al ancho del PDF
    private docTextWrap(text: string, maxWidth: number): string[] {
      const doc = new jsPDF();
      return doc.splitTextToSize(text, maxWidth);
    }

    descargarTranscripcion(transcripcion: any): void {
      const doc = new jsPDF();

      const text = transcripcion.transcripcion || 'Sin contenido';
      const fileName = `${transcripcion.nombreArchivo || 'transcripcion'}.pdf`;

      const lines = doc.splitTextToSize(text, 180); // ajusta a 180mm de ancho
      doc.setFontSize(12);
      doc.text(lines, 10, 10);
      doc.save(fileName);
    }

    cambiarModo(modo: 'resumen' | 'afiche' | 'glosario'): void {
      this.chatMode = modo;
      this.chatResponse = '';
      this.chatForm.get('prompt')?.setValue('');
    }
  }

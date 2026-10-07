
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import jsPDF from 'jspdf';
import { CommonModule } from '@angular/common';

interface FileInfo {
  id: number;
  name: string;
  size: string;
  uploadDate: Date;
}

@Component({
  selector: 'app-student-files',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './student-files.component.html',
  styleUrl: './student-files.component.scss'
})
export class StudentFilesComponent implements OnInit {
  grupoId = '';
  usuarioId = '';
  transcripciones: any[] = [];
  cuestionarios: any[] = [];
  selectedTranscription: any = null;
  isLoading = false;
  // Nuevas propiedades para el cuestionario interactivo
  cuestionarioActivo: any = null;
  respuestasUsuario: { [key: number]: string } = {};
  resultadoCuestionario: { correctas: number, total: number } | null = null;
  mostrandoResultado: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.usuarioId = localStorage.getItem('userId') || '';

    this.route.queryParams.subscribe(params => {
      this.grupoId = params['grupoId'] || '';
      if (!this.grupoId) {
        alert('Grupo no especificado');
        return;
      }

      this.cargarTranscripciones();
      this.cargarCuestionarios();
    });
  }

  cargarTranscripciones(): void {
    this.apiService.obtenerTranscripcionesPorGrupo(this.grupoId).subscribe({
      next: data => this.transcripciones = data,
      error: error => {
        console.error('Error al cargar transcripciones:', error);
        alert('Error al cargar transcripciones.');
      }
    });
  }

  cargarCuestionarios(): void {
    this.apiService.obtenerCuestionariosPorGrupo(this.grupoId).subscribe({
      next: data => this.cuestionarios = data,
      error: error => {
        console.error('Error al cargar cuestionarios:', error);
        alert('Error al cargar cuestionarios.');
      }
    });
  }

  seleccionarTranscripcion(transcripcion: any): void {
    this.selectedTranscription = transcripcion;
  }

  generarCuestionario(): void {
      if (!this.selectedTranscription) {
        alert('Seleccione una transcripción');
        return;
      }

      this.isLoading = true;
      this.apiService.generarCuestionario(
        this.selectedTranscription._id,
        `Genera un cuestionario basado en esta transcripción: ${this.selectedTranscription.transcripcion}`,
        'deepseek'
      ).subscribe({
        next: () => {
          this.isLoading = false;
          alert('Cuestionario generado');
          this.cargarCuestionarios();
        },
        error: error => {
          this.isLoading = false;
          console.error('Error al generar cuestionario:', error);
          alert('Error al generar cuestionario');
        }
      });
    }

    getCantidadRespuestas(): number {
      return Object.keys(this.respuestasUsuario).length;
    }

    // Métodos para el cuestionario interactivo
    iniciarCuestionario(cuestionario: any): void {
      this.cuestionarioActivo = this.parsearCuestionario(cuestionario);
      this.respuestasUsuario = {};
      this.resultadoCuestionario = null;
      this.mostrandoResultado = false;
    }

    parsearCuestionario(cuestionario: any): any {
      try {
        const preguntasRaw = this.getParsed(cuestionario.txt)?.preguntas || [];
        const respuestasRaw = this.getParsed(cuestionario.respuestas)?.respuestas || [];

        // Procesar preguntas y respuestas
        const preguntas = preguntasRaw.map((pregunta: string, index: number) => {
          // Obtener respuestas para esta pregunta
          let respuestas: string[] = [];

          if (Array.isArray(respuestasRaw[index])) {
            respuestas = respuestasRaw[index];
          } else if (typeof respuestasRaw[index] === 'string') {
            respuestas = [respuestasRaw[index]];
          }

          // Procesar cada respuesta para identificar las correctas (*)
          const opciones = respuestas.map((respuesta: string) => {
            // Eliminar comillas y corchetes si existen
            let textoRespuesta = respuesta
              .replace(/^\[?["']?|["']?\]?$/g, '')
              .replace(/^_|_$/g, ''); // Eliminar guiones bajos si existen

            const esCorrecta = respuesta.includes('*') || respuesta.startsWith('_');

            return {
              texto: textoRespuesta.replace(/\*/g, '').replace(/^_|_$/g, '').trim(),
              correcta: esCorrecta
            };
          });

          return {
            texto: pregunta.trim(),
            opciones: opciones
          };
        });

        return {
          nombre: cuestionario.nombreArchivo || 'Cuestionario',
          preguntas: preguntas
        };
      } catch (e) {
        console.error('Error al parsear cuestionario:', e);
        return null;
      }
    }

    seleccionarRespuesta(preguntaIndex: number, opcionIndex: number): void {
      const opcion = this.cuestionarioActivo.preguntas[preguntaIndex].opciones[opcionIndex];
      this.respuestasUsuario[preguntaIndex] = opcion.texto;
    }

    enviarCuestionario(): void {
      if (!this.cuestionarioActivo) return;

      let correctas = 0;
      const total = this.cuestionarioActivo.preguntas.length;

      this.cuestionarioActivo.preguntas.forEach((pregunta: any, index: number) => {
        const respuestaUsuario = this.respuestasUsuario[index];
        const respuestaCorrecta = pregunta.opciones.find((op: any) => op.correcta)?.texto;

        if (respuestaUsuario === respuestaCorrecta) {
          correctas++;
        }
      });

      this.resultadoCuestionario = { correctas, total };
      this.mostrandoResultado = true;
    }

    reiniciarCuestionario(): void {
      this.iniciarCuestionario(this.cuestionarioActivo);
    }

    // Métodos auxiliares
    mostrarResumen(txt: string): string {
      try {
        const parsed = JSON.parse(txt);
        if (parsed?.preguntas?.length > 0) {
          return parsed.preguntas.slice(0, 3).join(' | ') + '...';
        }
        return 'Sin preguntas';
      } catch (e) {
        return 'Contenido inválido';
      }
    }

    getParsed(jsonStr: string): any {
      try {
        return JSON.parse(jsonStr);
      } catch {
        return {};
      }
    }

    descargarCuestionario(cuestionario: any): void {
      const doc = new jsPDF();

      try {
        const contenidoPreguntas = JSON.parse(cuestionario.txt || '{}');
        const contenidoRespuestas = JSON.parse(cuestionario.respuestas || '{}');

        const preguntas = contenidoPreguntas?.preguntas || ['Sin preguntas'];
        const respuestas = contenidoRespuestas?.respuestas || ['Sin respuestas'];

        let y = 10;

        doc.setFontSize(14);
        doc.text('Cuestionario', 10, y);
        y += 10;

        doc.setFontSize(12);
        doc.text('Preguntas:', 10, y);
        y += 8;
        preguntas.forEach((p: string) => {
          const lines = doc.splitTextToSize('- ' + p, 180);
          doc.text(lines, 10, y);
          y += lines.length * 7;
        });

        y += 5;
        doc.setFontSize(12);
        doc.text('Respuestas:', 10, y);
        y += 8;
        respuestas.forEach((r: string) => {
          const lines = doc.splitTextToSize('- ' + r, 180);
          doc.text(lines, 10, y);
          y += lines.length * 7;
        });

      } catch (e) {
        doc.text('Error al leer contenido del cuestionario.', 10, 10);
      }

      const nombreArchivo = `${cuestionario.nombreArchivo || 'cuestionario'}.pdf`;
      doc.save(nombreArchivo);
    }

    eliminarCuestionario(id: string): void {
      if (!confirm('¿Estás seguro de eliminar este cuestionario?')) return;

      this.apiService.eliminarCuestionario(id).subscribe({
        next: () => {
          alert('Cuestionario eliminado');
          this.cargarCuestionarios();
        },
        error: error => {
          console.error('Error al eliminar:', error);
          alert('Error al eliminar cuestionario');
        }
      });
    }
  }

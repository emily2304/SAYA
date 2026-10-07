import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupService } from '../../services/group.service';
import { AuthService } from '../../services/auth.service';
import { Sidebar1Component } from '../../shared/sidebar1/sidebar1.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, Sidebar1Component, HttpClientModule, ReactiveFormsModule],
  selector: 'app-professor-create-group',
  templateUrl: './professor-create-group.component.html',
  styleUrls: ['./professor-create-group.component.scss']
})
export class ProfessorCreateGroupComponent {
  groupForm: FormGroup;
  creationSuccess = false;
  creationError = '';

  constructor(
    private fb: FormBuilder,
    private groupService: GroupService,
    private authService: AuthService
  ) {
    this.groupForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      urlImagen: ['']
    });
  }

  createGroup() {
    const { nombre, descripcion, urlImagen } = this.groupForm.value;
    const adminId = this.authService.getUserId();

    if (!adminId) {
      this.creationError = 'No se encontró el ID del profesor. Inicia sesión nuevamente.';
      return;
    }

    const payload = {
      nombre,
      descripcion,
      urlImagen,
      administradores: [adminId],
      miembros: [adminId]
    };

    this.groupService.createGroup(payload).subscribe({
      next: (grupo: any) => {
        this.creationSuccess = true;
        this.creationError = '';
        this.groupForm.reset();

        // Crear el foro automáticamente después del grupo
        const foroPayload = {
          grupo: grupo._id,
          titulo: `Foro del grupo ${grupo.nombre}`,
          mensajes: []
        };

        this.groupService.createForo(foroPayload).subscribe({
          next: () => {
            console.log('Foro creado exitosamente');
          },
          error: (err) => {
            console.error('Error al crear foro:', err);
          }
        });
      },
      error: (err) => {
        this.creationSuccess = false;
        this.creationError = 'Error al crear el grupo.';
        console.error(err);
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar1Component } from '../../shared/sidebar1/sidebar1.component';
import { Router, ActivatedRoute } from '@angular/router';
import { GroupService } from '../../services/group.service'; // Asegúrate de tener este servicio
@Component({
  selector: 'app-professor-groups-details',
  standalone: true,
  imports: [CommonModule, Sidebar1Component],
  templateUrl: './professor-groups-details.component.html',
  styleUrls: ['./professor-groups-details.component.scss']
})
export class ProfessorGroupsDetailsComponent implements OnInit {
  items = ['Transcripciones', 'Foros', 'Afiches', 'Cuestionarios'];
  groupId: string = '';
  groupName: string = 'Cargando...';
  groupImageUrl: string = '';

  constructor(private router: Router, private route: ActivatedRoute,  private groupsService: GroupService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.groupId = params['grupoId'];
      console.log('Grupo ID:', this.groupId);

      // Obtener los datos del grupo
      this.loadGroupDetails(this.groupId);
    });
  }

  loadGroupDetails(groupId: string) {
    // Llamar al servicio para obtener los detalles del grupo
    this.groupsService.getGroupById(groupId).subscribe({
      next: (group) => {
        this.groupName = group.nombre;
        this.groupImageUrl = group.urlImagen;
      },
      error: (err) => {
        console.error('Error al cargar los detalles del grupo:', err);
        this.groupName = 'Grupo no encontrado';
      }
    });
  }

  navigateTo(item: string) {
    switch (item) {
      case 'Transcripciones':
        this.router.navigate(['/principal/transcription-grupo-professor'], {
          queryParams: { grupoId: this.groupId }
        });
        break;
      case 'Foros':
        this.router.navigate(['/principal/professor-foro'], {
          queryParams: { grupoId: this.groupId }
        });
        break;
      case 'Afiches':
        this.router.navigate(['/principal/professor-files'], {
          queryParams: { grupoId: this.groupId }
        });
        break;
      case 'Cuestionarios':
        this.router.navigate(['/principal/cuestionarios-g'], {
          queryParams: { grupoId: this.groupId }
        });
        break;
      default:
        console.warn(`No se encontró una ruta para ${item}`);
    }
  }

  logout() {
    console.log('Cerrando sesión...');
    this.router.navigate(['/landing']);
  }
}

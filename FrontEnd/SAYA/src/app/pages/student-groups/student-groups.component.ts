import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { Router, ActivatedRoute } from '@angular/router';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-student-groups',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './student-groups.component.html',
  styleUrls: ['./student-groups.component.scss'],
})
export class StudentGroupsComponent {
  groupId: string = '';
  groupName: string = 'Cargando...';
  groupImageUrl: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private groupsService: GroupService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.groupId = params['grupoId'];
      console.log('Grupo ID:', this.groupId);
      this.loadGroupDetails(this.groupId);
    });
  }

  loadGroupDetails(groupId: string) {
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

  items = [
    { label: 'Transcripciones', route: '/principal/transcription-grupo-student' },
    { label: 'Foro', route: '/principal/student-foro' },
    { label: 'Afiches', route: '/principal/student-afiches' },
    { label: 'Cuestionarios', route: '/principal/student-files' }
  ];

  navigateTo(label: string) {
    const found = this.items.find(i => i.label === label);
    if (found && this.groupId) {
      this.router.navigate([found.route], {
        queryParams: {grupoId: this.groupId,}
      });
    }
  }
}

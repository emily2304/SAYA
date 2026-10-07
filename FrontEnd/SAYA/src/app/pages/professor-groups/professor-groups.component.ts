import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Sidebar1Component } from '../../shared/sidebar1/sidebar1.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-professor-groups',
  standalone: true,
  imports: [CommonModule, Sidebar1Component, HttpClientModule],
  templateUrl: './professor-groups.component.html',
  styleUrls: ['./professor-groups.component.scss']
})
export class ProfessorGroupsComponent implements OnInit {
  professorGroups: any[] = [];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');

    if (userId) {
      this.http.get<any[]>(`http://localhost:3000/api/grupos/por-usuario/${userId}`)
        .subscribe({
          next: (grupos) => {  // <-- Aquí declaras correctamente 'grupos'
            this.professorGroups = grupos.map(g => ({
              _id: g._id,              // 👈 añadimos el ID aquí
              name: g.nombre,
              description: g.descripcion
            }));
          },
          error: (error) => {
            console.error('Error al obtener grupos del profesor', error);
          }
        });
    }
  }

  createGroup() {
    this.router.navigate(['/principal/professor-create-group']);
  }

  viewGroup(group: any) {
    this.router.navigate(['/principal/professor-groups-details'], {
      queryParams: {
        grupoId: group._id, // <-- aquí va el ID del grupo
        name: group.name
      }
    });
  }

  editGroup(group: any) {
    this.router.navigate(['/principal/professor-edite-groups'], {
      queryParams: {
        grupoId: group._id, // <-- aquí va el ID del grupo
        name: group.name
      }
    });
  }


  confirmDeleteGroup(group: any) {
    const confirmDelete = confirm(`Are you sure you want to delete the group "${group.name}"?`);
    if (confirmDelete) {
      this.deleteGroup(group);
    }
  }

  deleteGroup(group: any) {
    this.professorGroups = this.professorGroups.filter(g => g !== group);
    alert(`Group "${group.name}" has been deleted.`);
  }
}

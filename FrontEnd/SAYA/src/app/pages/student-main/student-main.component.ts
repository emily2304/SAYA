import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student-main',
  standalone: true,
  imports: [CommonModule, SidebarComponent, HttpClientModule],
  templateUrl: './student-main.component.html',
  styleUrls: ['./student-main.component.scss']
})
export class StudentMainComponent implements OnInit {
  studentGroups: any[] = [];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');

    if (userId) {
      this.http.get<any[]>(`http://localhost:3000/api/grupos/por-usuario/${userId}`)
        .subscribe({
          next: (grupos: any[]) => {
            this.studentGroups = grupos.map((g: any) => ({
              id: g._id,
              name: g.nombre,
              description: g.descripcion
            }));
          },
          error: (error: any) => {
            console.error('Error al obtener grupos del estudiante', error);
          }
        });
    }
  }

  enterGroup(group: any) {
    this.router.navigate(['/principal/student-groups'], {
      queryParams: {
        grupoId: group.id,
        name: group.name
      }
    });
  }
}

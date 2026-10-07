import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Sidebar1Component } from '../../shared/sidebar1/sidebar1.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faImage, faUserPlus, faTimesCircle, faCheckCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from '../../services/group.service';
import { UsuarioService } from '../../services/usuario.service';
import { ReactiveFormsModule } from '@angular/forms';


interface Group {
  _id: string;
  nombre: string;
  descripcion: string;
  urlImagen: string;
  miembros: any[];
}

interface GroupMember {
  _id: string;
  nombre: string;
  email: string;
  rol?: string;
}

@Component({
  selector: 'app-professor-edite-groups',
  standalone: true,
  imports: [FormsModule, CommonModule, Sidebar1Component, FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './professor-edite-groups.component.html',
  styleUrls: ['./professor-edite-groups.component.scss']
})
export class ProfessorEditeGroupsComponent implements OnInit {
  currentMembers: GroupMember[] = [];
  groupForm: FormGroup;
  groupId: string = "";
  loading = false;
  updateSuccess = false;
  updateError = '';
  currentProcessingIndex = -1;
  faImage = faImage;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private groupService: GroupService,
    private userService: UsuarioService
  ) {
    this.groupForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      urlImagen: [''],
      members: this.fb.array([])
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.groupId = params['grupoId'];

      if (this.groupId) {
        this.loadGroupData();
        this.addMemberField();
      } else {
        this.updateError = 'No se encontró ID del grupo';
      }
    });
  }



  loadGroupData() {
    this.loading = true;
    this.groupService.getGroupById(this.groupId).subscribe({
      next: async (group: any) => {
        this.groupForm.patchValue({
          nombre: group.nombre,
          descripcion: group.descripcion,
          urlImagen: group.urlImagen || ''
        });

        // Cargar detalles completos de los miembros
        await this.loadMembersDetails(group.miembros || []);
        this.loading = false;
      },
      error: (err) => {
        this.handleLoadError(err);
      }
    });
  }
  handleLoadError(err: any) {
    throw new Error('Method not implemented.');
  }

  private async loadMembersDetails(memberIds: string[]) {
    this.currentMembers = [];
    for (const memberId of memberIds) {
      try {
        const user = await this.userService.getUserById(memberId).toPromise();
        this.currentMembers.push({
          _id: user._id,
          nombre: user.nombre || user.email.split('@')[0], // Usa el nombre o la parte antes del @ del email
          email: user.email,
          rol: user.rol
        });
      } catch (error) {
        console.error(`Error cargando usuario ${memberId}:`, error);
        this.currentMembers.push({
          _id: memberId,
          nombre: 'Usuario',
          email: 'email-no-disponible',
          rol: 'miembro'
        });
      }
    }
  }


  get members(): FormArray {
    return this.groupForm.get('members') as FormArray;
  }

  addMemberField() {
    this.members.push(this.fb.control('', [Validators.email]));
  }

  removeMemberField(index: number) {
    if (this.members.length > 1) {
      this.members.removeAt(index);
    }
  }

  async updateGroup() {
    if (this.groupForm.invalid) {
      this.updateError = 'Por favor complete los campos requeridos correctamente';
      return;
    }

    this.loading = true;
    this.updateSuccess = false;
    this.updateError = '';

    const { nombre, descripcion, urlImagen, members } = this.groupForm.value;
    const validEmails = members.filter((email: string) =>
      email && Validators.email(this.fb.control(email)) === null);

    try {
      // 1. Actualizar datos básicos del grupo
      await this.groupService.updateGroup(this.groupId, {
        nombre,
        descripcion,
        urlImagen
      }).toPromise();

      // 2. Agregar miembros uno por uno
      if (validEmails.length > 0) {
        await this.addMembersOneByOne(validEmails);
      }

      this.updateSuccess = true;
      // Recargar datos después de actualizar
      this.loadGroupData();
    } catch (error: any) {
      this.handleUpdateError(error);
    } finally {
      this.loading = false;
    }
  }

  private async addMembersOneByOne(emails: string[]): Promise<void> {
    const results = {
      success: [] as string[],
      failed: [] as string[]
    };

    for (let i = 0; i < emails.length; i++) {
      const email = emails[i];
      this.currentProcessingIndex = i;

      try {
        const user = await this.userService.getUserByEmail(email).toPromise();
        await this.groupService.addMemberToGroup(this.groupId, user._id).toPromise();
        results.success.push(email);
      } catch (error) {
        console.error(`Error agregando ${email}:`, error);
        results.failed.push(email);
      }
    }

    this.currentProcessingIndex = -1;

    if (results.failed.length > 0) {
      this.updateError = `No se pudieron agregar: ${results.failed.join(', ')}`;
    }
    if (results.success.length > 0) {
      // Limpiar campos de email después de agregar exitosamente
      this.members.clear();
      this.addMemberField();
    }
  }

  private handleUpdateError(error: any) {
    if (error.error?.message) {
      this.updateError = error.error.message;
    } else if (error.message) {
      this.updateError = error.message;
    } else {
      this.updateError = 'Error desconocido al actualizar el grupo';
    }
  }
}

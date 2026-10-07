import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { AiAssistantComponent } from './pages/ai-assistant/ai-assistant.component';
import { LandingpageComponent } from './pages/landingpage/landingpage.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { LoginComponent } from './pages/login/login.component';
import { StudentMainComponent } from './pages/student-main/student-main.component';
import { StudentGroupsComponent } from './pages/student-groups/student-groups.component';
import { ProfessorAdsComponent } from './pages/professor-ads/professor-ads.component';
import { ProfessorCreateGroupComponent } from './pages/professor-create-group/professor-create-group.component';
import { ProfessorEditeGroupsComponent } from './pages/professor-edite-groups/professor-edite-groups.component';
import { ProfessorFilesComponent } from './pages/professor-files/professor-files.component';
import { ProfessorForoComponent } from './pages/professor-foro/professor-foro.component';
import { ProfessorGroupsComponent } from './pages/professor-groups/professor-groups.component';
import { ProfessorGroupsDetailsComponent } from './pages/professor-groups-details/professor-groups-details.component';
import { ProfessorMembersComponent } from './pages/professor-members/professor-members.component';
import { RegisterComponent } from './pages/register/register.component';
import { StudentAdsgroupsComponent } from './pages/student-adsgroups/student-adsgroups.component';
import { StudentAficheDetailsComponent } from './pages/student-afiche-details/student-afiche-details.component';
import { StudentAfichesComponent } from './pages/student-afiches/student-afiches.component';
import { StudentCreateAficheComponent } from './pages/student-create-afiche/student-create-afiche.component';
import { StudentCreateTranscriptionComponent } from './pages/student-create-transcription/student-create-transcription.component';
import { StudentFilesComponent } from './pages/student-files/student-files.component';
import { StudentForoComponent } from './pages/student-foro/student-foro.component';
import { StudentTrasncriptiondetailsComponent } from './pages/student-trasncriptiondetails/student-trasncriptiondetails.component';
import { StudyRoomComponent } from './pages/study-room/study-room.component';
import { TranscriptionComponent } from './pages/transcription/transcription.component';
import { TranscriptionProfessorComponent } from './pages/transcription-professor/transcription-professor.component';
import { AiAssistantProfComponent } from './pages/ai-assistant-prof/ai-assistant-prof.component';
import { TranscriptionGrupoProfessorComponent } from './pages/transcription-grupo-professor/transcription-grupo-professor.component';
import { TranscriptionGrupoStudentComponent } from './pages/transcription-grupo-student/transcription-grupo-student.component';
import { CuestionariosEComponent } from './pages/cuestionarios-e/cuestionarios-e.component';
import { CuestionariosGComponent } from './pages/cuestionarios-g/cuestionarios-g.component';
import { CuestionariosPComponent } from './pages/cuestionarios-p/cuestionarios-p.component';
import { PostersEstdComponent } from './pages/posters-estd/posters-estd.component';
import { PostersProfComponent } from './pages/posters-prof/posters-prof.component';

export const routes: Routes = [
  { path: '', component: LandingpageComponent },
  { path: 'landing', component: LandingpageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'principal',
    component: LayoutPageComponent,
    children: [
      { path: 'ai-assistant', component: AiAssistantComponent },
      { path: 'professor-ads', component: ProfessorAdsComponent },
      { path: 'professor-create-group', component: ProfessorCreateGroupComponent },
      { path: 'professor-edite-groups', component: ProfessorEditeGroupsComponent },
      { path: 'professor-files', component: ProfessorFilesComponent },
      { path: 'professor-foro', component: ProfessorForoComponent },
      { path: 'professor-groups', component: ProfessorGroupsComponent },
      { path: 'professor-groups-details', component: ProfessorGroupsDetailsComponent },
      { path: 'professor-members', component: ProfessorMembersComponent },
      { path: 'student-adsgroups', component: StudentAdsgroupsComponent },
      { path: 'student-afiche-details', component: StudentAficheDetailsComponent },
      { path: 'student-afiches', component: StudentAfichesComponent },
      { path: 'student-create-afiche', component: StudentCreateAficheComponent},
      { path: 'student-create-transcription', component: StudentCreateTranscriptionComponent },
      { path: 'student-files', component: StudentFilesComponent },
      { path: 'student-foro', component: StudentForoComponent },
      { path: 'student-groups', component: StudentGroupsComponent },
      { path: 'student-main',component: StudentMainComponent },
      { path: 'student-transcriptiondetails',component: StudentTrasncriptiondetailsComponent },
      { path: 'study-room',component: StudyRoomComponent},
      { path: 'transcription',component: TranscriptionComponent },
      { path: 'transcription-professor',component: TranscriptionProfessorComponent},
      { path: 'ai-assistant-prof',component: AiAssistantProfComponent},
      { path: 'transcription-grupo-professor',component: TranscriptionGrupoProfessorComponent},
      { path: 'transcription-grupo-student',component: TranscriptionGrupoStudentComponent},
      { path: 'cuestionarios-e',component: CuestionariosEComponent},
      { path: 'cuestionarios-p',component: CuestionariosPComponent},
      { path: 'cuestionarios-g',component: CuestionariosGComponent},
      { path: 'posters-estd',component: PostersEstdComponent},
      { path: 'posters-prof',component: PostersProfComponent},
    ]
  },
  {
    path: '**',
    redirectTo: ''  // redirige cualquier ruta no válida al landing
  }
];


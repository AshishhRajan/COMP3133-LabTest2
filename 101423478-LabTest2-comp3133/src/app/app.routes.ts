import { Routes } from '@angular/router';
import { MissionlistComponent } from './components/missionlist/missionlist.component';
import { MissiondetailsComponent } from './components/missiondetails/missiondetails.component';
import { withDisabledInitialNavigation } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/missions', pathMatch: 'full' },
  { path: 'missions', component: MissionlistComponent },
  { 
    path: 'mission/:id', 
    component: MissiondetailsComponent,
    data: { renderMode: 'default' } 
  },
  { path: '**', redirectTo: '/missions' }
];

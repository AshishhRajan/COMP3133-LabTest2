import { Routes } from '@angular/router';
import { MissionlistComponent } from './components/missionlist/missionlist.component';

export const routes: Routes = [
  { path: '', redirectTo: '/missions', pathMatch: 'full' },
  { path: 'missions', component: MissionlistComponent },
  { path: '**', redirectTo: '/missions' }
];

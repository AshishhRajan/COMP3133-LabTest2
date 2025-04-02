import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';

import { SpacexService } from '../../services/spacex.service';
import { Launch } from '../../models/launch.model';
import { MissionfilterComponent } from '../missionfilter/missionfilter.component';

@Component({
  selector: 'app-missionlist',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MissionfilterComponent
  ],
  templateUrl: './missionlist.component.html',
  styleUrl: './missionlist.component.css'
})
export class MissionlistComponent implements OnInit {
  launches: Launch[] = [];
  loading = true;
  error: string | null = null;
  currentFilters = {
    year: '',
    launchSuccess: null,
    landSuccess: null
  };

  constructor(private spacexService: SpacexService, private router: Router) {}

  ngOnInit(): void {
    this.loadLaunches();
  }

  loadLaunches(): void {
    this.loading = true;
    this.spacexService.getAllLaunches().subscribe({
      next: (data) => {
        this.launches = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load missions';
        this.loading = false;
        console.error('Error loading missions:', err);
      }
    });
  }

  onFiltersChanged(filters: any): void {
    this.currentFilters = filters;
    this.loading = true;
    
    this.spacexService.getFilteredLaunches(filters).subscribe({
      next: (data) => {
        this.launches = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to filter missions';
        this.loading = false;
        console.error('Error filtering missions:', err);
      }
    });
  }

  viewMissionDetails(flightNumber: number): void {
    this.router.navigate(['/mission', flightNumber]);
  }
}

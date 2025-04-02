import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';

import { SpacexService } from '../../services/spacex.service';
import { Launch } from '../../models/launch.model';

@Component({
  selector: 'app-missiondetails',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatListModule,
    MatChipsModule
  ],
  templateUrl: './missiondetails.component.html',
  styleUrl: './missiondetails.component.css'
})
export class MissiondetailsComponent implements OnInit {
  mission: Launch | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spacexService: SpacexService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadMissionDetails(parseInt(id, 10));
      } else {
        this.error = 'Mission ID not provided';
        this.loading = false;
      }
    });
  }

  loadMissionDetails(id: number): void {
    this.loading = true;
    this.spacexService.getLaunchById(id).subscribe({
      next: (data) => {
        this.mission = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load mission details';
        this.loading = false;
        console.error('Error loading mission details:', err);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/missions']);
  }
}

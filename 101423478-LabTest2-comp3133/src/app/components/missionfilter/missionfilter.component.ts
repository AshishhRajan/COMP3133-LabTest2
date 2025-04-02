import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-missionfilter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './missionfilter.component.html',
  styleUrl: './missionfilter.component.css'
})
export class MissionfilterComponent implements OnInit {
  @Output() filterChanged = new EventEmitter<any>();
  
  selectedYear: string = '';
  launchSuccess: string | null = null;
  landSuccess: string | null = null;
  years: string[] = [];
  
  ngOnInit(): void {
    this.generateYearList();
  }
  
  generateYearList(): void {
    const currentYear = new Date().getFullYear();
    const startYear = 2006; // SpaceX first launch
    
    for (let year = currentYear; year >= startYear; year--) {
      this.years.push(year.toString());
    }
  }
  
  applyFilters(): void {
    const filters = {
      year: this.selectedYear,
      launchSuccess: this.launchSuccess === 'true' ? true : 
                     this.launchSuccess === 'false' ? false : null,
      landSuccess: this.landSuccess === 'true' ? true : 
                   this.landSuccess === 'false' ? false : null
    };
    
    this.filterChanged.emit(filters);
  }
  
  resetFilters(): void {
    this.selectedYear = '';
    this.launchSuccess = null;
    this.landSuccess = null;
    
    this.filterChanged.emit({
      year: '',
      launchSuccess: null,
      landSuccess: null
    });
  }
}

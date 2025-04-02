import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Launch } from '../models/launch.model';

@Injectable({
  providedIn: 'root'
})
export class SpacexService {
  private baseUrl = 'https://api.spacexdata.com/v3/launches';

  constructor(private http: HttpClient) {}

  getAllLaunches(): Observable<Launch[]> {
    return this.http.get<Launch[]>(this.baseUrl);
  }

  getFilteredLaunches(filters: any): Observable<Launch[]> {
    let params = new HttpParams();
    
    if (filters.year) {
      params = params.append('launch_year', filters.year);
    }
    
    if (filters.launchSuccess !== null) {
      params = params.append('launch_success', filters.launchSuccess);
    }
    
    if (filters.landSuccess !== null) {
      params = params.append('land_success', filters.landSuccess);
    }
    
    return this.http.get<Launch[]>(this.baseUrl, { params });
  }

  getLaunchesByYear(year: string): Observable<Launch[]> {
    return this.http.get<Launch[]>(`${this.baseUrl}?launch_year=${year}`);
  }

  getLaunchById(id: number): Observable<Launch> {
    return this.http.get<Launch>(`${this.baseUrl}/${id}`);
  }
}

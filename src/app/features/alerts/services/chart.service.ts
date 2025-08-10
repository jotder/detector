import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private inMemoryCDRs: any[] = [];

  constructor(private http: HttpClient) {}

  getCDRs(): Observable<any[]> {
    return this.http.get<any[]>('assets/mockdata.add.json');
  }
  getEdges(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/edges');
  }
  getNodes(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/node');
  }

  // Save parsed JSON in memory
  setCDRs(data: any[]): void {
    this.inMemoryCDRs = data;
  }

  // Retrieve in-memory data (e.g., in map view)
  getCDRsFromMemory(): any[] {
    return this.inMemoryCDRs;
  }
}

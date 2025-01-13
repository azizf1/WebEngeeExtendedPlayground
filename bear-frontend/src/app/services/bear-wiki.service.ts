import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BearData } from '../models/bear-data.model';

@Injectable({
  providedIn: 'root',
})
export class BearDataService {
  private readonly backendUrl = 'http://localhost:3000/api/bears';

  constructor(private readonly http: HttpClient) {}

  fetchBearData(): Observable<BearData> {
    return this.http.get<BearData>(this.backendUrl);
  }
}

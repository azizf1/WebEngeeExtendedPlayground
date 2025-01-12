import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import type { BearData } from '../models/bear-data.model';

@Injectable({
  providedIn: 'root',
})
export class BearDataService {
  private readonly baseUrl = 'https://en.wikipedia.org/w/api.php';

  constructor(private readonly http: HttpClient) {}

  fetchBearData(): Observable<BearData> {
    const params = {
      action: 'parse',
      page: 'List_of_ursids',
      prop: 'wikitext',
      section: '3',
      format: 'json',
      origin: '*',
    };

    return this.http.get<BearData>(
      `${this.baseUrl}?${new URLSearchParams(params)}`
    );
  }
}

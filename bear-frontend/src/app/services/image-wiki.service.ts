import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, lastValueFrom } from 'rxjs';
import { WikiQueryResponse } from '../models/wiki-query-response.model';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private readonly backendUrl = 'http://localhost:3000/api/image';

  constructor(private readonly http: HttpClient) {}

  async fetchImageUrl(fileName: string): Promise<string> {
    const response = await lastValueFrom(
      this.http
        .get<WikiQueryResponse>(`${this.backendUrl}?fileName=${fileName}`)
        .pipe(
          map((response) => {
            const pages = Object.values(response.query.pages);
            const [firstPage] = pages;
            const imageinfo = firstPage.imageinfo ?? [];
            const [firstImageInfo] = imageinfo;
            return firstImageInfo.url ?? 'assets/media/placeholder.jpg';
          })
        )
    );

    return response;
  }
}

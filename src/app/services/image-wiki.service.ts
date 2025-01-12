import { Injectable } from '@angular/core';
import { map, lastValueFrom } from 'rxjs';
import type { WikiQueryResponse } from '../models/wiki-query-response.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private readonly baseUrl = 'https://en.wikipedia.org/w/api.php';

  constructor(private readonly http: HttpClient) {}

  async fetchImageUrl(fileName: string): Promise<string> {
    const params = {
      action: 'query',
      titles: `File:${fileName}`,
      prop: 'imageinfo',
      iiprop: 'url',
      format: 'json',
      origin: '*',
    };

    const response = await lastValueFrom(
      this.http.get<WikiQueryResponse>(this.baseUrl, { params }).pipe(
        map((response) => {
          const {
            query: { pages },
          } = response;
          const [firstPage] = Object.values(pages);
          const { imageinfo = [] } = firstPage;
          const [firstImageInfo] = imageinfo;
          return firstImageInfo.url ?? 'assets/media/placeholder.jpg';
        })
      )
    );

    return response;
  }
}

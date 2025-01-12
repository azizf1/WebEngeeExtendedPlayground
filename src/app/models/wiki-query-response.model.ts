import type { Page } from './page.model';

export interface WikiQueryResponse {
  query: {
    pages: Record<string, Page>;
  };
}

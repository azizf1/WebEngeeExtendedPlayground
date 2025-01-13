import { Component } from '@angular/core';
import type { Bear } from '../models/bear.model';
import { BearDataService } from '../services/bear-wiki.service';
import { ImageService } from '../services/image-wiki.service';
import { CommonModule } from '@angular/common';

const NAME_GROUP_INDEX = 1;
const BINOMIAL_GROUP_INDEX = 1;
const IMAGE_GROUP_INDEX = 1;
const RANGE_GROUP_INDEX = 1;

@Component({
  selector: 'app-more-bears',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './more-bears.component.html',
  styleUrl: './more-bears.component.css',
})
export class MoreBearsComponent {
  bears: Bear[] = [];

  constructor(
    private readonly bearDataService: BearDataService,
    private readonly imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.fetchBearData();
  }

  fetchBearData(): void {
    this.bearDataService.fetchBearData().subscribe({
      next: (response) => {
        const {
          parse: {
            wikitext: { '*': wikitext },
          },
        } = response;

        if (typeof wikitext === 'string' && wikitext !== '') {
          this.extractBears(wikitext).catch((err: unknown) => {
            if (err instanceof Error) {
              console.error('Error extracting bears:', err.message);
            } else {
              console.error(
                'An unknown error occurred during extraction:',
                err
              );
            }
          });
        }
      },
      error: (err) => {
        console.error('Error fetching bear data:', err);
      },
    });
  }

  private async extractBears(wikitext: string): Promise<void> {
    const speciesTables = wikitext.split('{{Species table/end}}');
    const bears: Bear[] = [];

    for (const table of speciesTables) {
      const rows = table.split('{{Species table/row');
      for (const row of rows) {
        const bear = await this.extractBearDetails(row);
        if (bear != null) {
          bears.push(bear);
        }
      }
    }

    this.bears = bears;
  }

  private async extractBearDetails(row: string): Promise<Bear | null> {
    const matchPatterns = [
      /\|name=\[\[(.*?)\]\]/,
      /\|binomial=(.*?)\n/,
      /\|image=(.*?)\n/,
      /\|range=([^|]*)(?=\s*\()/,
    ];

    // Validate and narrow matches with explicit filtering
    const matches = matchPatterns.map((pattern) => pattern.exec(row));

    // Check and narrow types without unsafe or non-null assertions
    if (matches.some((match) => match === null)) {
      return null;
    }

    const [nameMatch, binomialMatch, imageMatch, rangeMatch] = matches.filter(
      (match): match is RegExpExecArray => match !== null
    );

    const fileName = imageMatch[IMAGE_GROUP_INDEX].trim().replace('File:', '');
    const imageUrl = await this.imageService.fetchImageUrl(fileName);

    return {
      name: nameMatch[NAME_GROUP_INDEX],
      binomial: binomialMatch[BINOMIAL_GROUP_INDEX],
      image: imageUrl,
      range:
        rangeMatch[RANGE_GROUP_INDEX].trim() !== ''
          ? rangeMatch[RANGE_GROUP_INDEX]
          : 'Range information not available',
    };
  }
}

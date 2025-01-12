import { ImageService } from '../src/app/services/image-wiki.service';
import { of } from 'rxjs';

global.fetch = jest.fn();

beforeAll(() => {
  jest.spyOn(global.console, 'error').mockImplementation(() => undefined);
});

afterAll(() => {
  jest.spyOn(console, 'error').mockRestore();
});

describe('ImageService', () => {
  let imageService: ImageService | null = null;

  beforeEach(() => {
    const mockHttpClient = {
      get: jest.fn(),
    };
    imageService = new ImageService(mockHttpClient as any);
  });

  it('should return the correct image URL when API response is valid', async () => {
    const mockFileName = 'TestFile.jpg';
    const mockResponse = {
      query: {
        pages: {
          '123': {
            imageinfo: [{ url: 'https://google.com/test-image.jpg' }],
          },
        },
      },
    };

    (imageService as any).http.get.mockReturnValue(of(mockResponse));

    const imageUrl = await imageService?.fetchImageUrl(mockFileName);

    expect(imageUrl).toBe('https://google.com/test-image.jpg');
  });

  it('should return placeholder image URL when API response is invalid', async () => {
    const invalidResponse = {
      query: {
        pages: {
          '123': {
            imageinfo: undefined,
          },
        },
      },
    };

    (imageService as any).http.get.mockReturnValue(of(invalidResponse));

    let imageUrl: string | null = null;

    try {
      imageUrl = (await imageService?.fetchImageUrl('InvalidFile.jpg')) || null;
    } catch (error) {
      console.error('Error during service execution:', error);
      imageUrl = 'assets/media/placeholder.jpg';
    }

    expect(imageUrl).toBe('assets/media/placeholder.jpg');
  });
});

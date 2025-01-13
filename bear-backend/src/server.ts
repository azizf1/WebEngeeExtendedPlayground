import express, { Request, Response } from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/api/bears', async (req: Request, res: Response) => {
  try {
    const params = {
      action: 'parse',
      page: 'List_of_ursids',
      prop: 'wikitext',
      section: '3',
      format: 'json',
      origin: '*',
    };

    const response = await axios.get('https://en.wikipedia.org/w/api.php', { params });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching bear data:', error);
    res.status(500).json({ error: 'Failed to fetch bear data' });
  }
});

app.get('/api/image', async (req: Request, res: Response) => {
  const { fileName } = req.query;

  if (!fileName || typeof fileName !== 'string') {
    res.status(400).json({ error: 'Missing or invalid fileName parameter' });
    return;
  }

  try {
    const params = {
      action: 'query',
      titles: `File:${fileName}`,
      prop: 'imageinfo',
      iiprop: 'url',
      format: 'json',
      origin: '*',
    };

    const response = await axios.get('https://en.wikipedia.org/w/api.php', { params });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching image data:', error);
    res.status(500).json({ error: 'Failed to fetch image data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

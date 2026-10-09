import express from 'express';
import { config } from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { MongoClient } from 'mongodb';
import { defaultContent } from '../src/data/defaultContent';
import type { FormSubmission, SiteContent } from '../src/types/content';

config({ path: process.env.MONGODB_ENV_FILE ?? '.env' });

const PORT = Number(process.env.PORT ?? 3001);
const MONGODB_URI = process.env.MONGODB_URI;
const DATABASE_NAME = process.env.MONGODB_DB_NAME ?? 'UpThrust';

if (!MONGODB_URI) {
  throw new Error(
    'MONGODB_URI is required. Add it to atlas-credentials.env or your deployment secret store.'
  );
}

const client = new MongoClient(MONGODB_URI);
const database = client.db(DATABASE_NAME);
const contentCollection = database.collection<{ _id: string; content: SiteContent }>('cms');
const submissionsCollection = database.collection<FormSubmission & { _id: string }>('submissions');

const app = express();
app.use(express.json({ limit: '1mb' }));

app.get('/api/cms/content', async (_req, res, next) => {
  try {
    const stored = await contentCollection.findOne({ _id: 'site-content' });
    res.json(stored?.content ?? defaultContent);
  } catch (error) {
    next(error);
  }
});

app.put('/api/cms/content', async (req, res, next) => {
  try {
    const content = req.body as SiteContent;
    if (!content?.hero || !Array.isArray(content.services) || !Array.isArray(content.faqs)) {
      res.status(400).json({ error: 'Invalid site content.' });
      return;
    }

    await contentCollection.replaceOne(
      { _id: 'site-content' },
      { _id: 'site-content', content },
      { upsert: true }
    );
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

app.get('/api/submissions', async (_req, res, next) => {
  try {
    const submissions = await submissionsCollection
      .find({}, { projection: { _id: 0 } })
      .sort({ timestamp: -1 })
      .toArray();
    res.json(submissions);
  } catch (error) {
    next(error);
  }
});

app.post('/api/submissions', async (req, res, next) => {
  try {
    const submission = req.body as FormSubmission;
    if (!submission?.id || !submission.type || !submission.timestamp || !submission.data) {
      res.status(400).json({ error: 'Invalid form submission.' });
      return;
    }

    await submissionsCollection.insertOne({ ...submission, _id: submission.id });
    res.status(201).json({ ok: true });
  } catch (error) {
    next(error);
  }
});

app.delete('/api/submissions', async (_req, res, next) => {
  try {
    await submissionsCollection.deleteMany({});
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

const frontendPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');
app.use(express.static(frontendPath));
app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) {
    res.status(404).json({ error: 'API route not found.' });
    return;
  }

  next();
});

app.use((_req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.use(
  (error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error('API request failed:', error);
    res.status(500).json({ error: 'The request could not be completed.' });
  }
);

async function start() {
  await client.connect();
  await database.command({ ping: 1 });
  await contentCollection.updateOne(
    { _id: 'site-content' },
    { $setOnInsert: { content: defaultContent } },
    { upsert: true }
  );
  console.log(`Connected to MongoDB database "${DATABASE_NAME}".`);
  app.listen(PORT, () => {
    console.log(`UpThrust server listening on http://localhost:${PORT}`);
  });
}

start().catch((error) => {
  console.error('Failed to start UpThrust server:', error);
  process.exitCode = 1;
});

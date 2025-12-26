require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { Low, JSONFile } = require('lowdb');
const { customAlphabet } = require('nanoid');
const { MongoClient } = require('mongodb');

const PORT = process.env.PORT || 4000;
const DB_FILE = process.env.DB_FILE || path.join(__dirname, 'db.json');
const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(__dirname, 'uploads');

// ensure upload dir
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// lowdb setup (fallback)
const adapter = new JSONFile(DB_FILE);
const db = new Low(adapter);

let mongoClient = null;
let mongoDb = null;
let linksCol = null;
let filesCol = null;

async function initDB() {
  await db.read();
  db.data = db.data || { links: [], files: [] };
  await db.write();

  const MONGO_URI = process.env.MONGO_URI;
  const MONGO_DB = process.env.MONGO_DB || undefined; // if undefined, driver uses DB from URI
  if (MONGO_URI) {
    try {
      mongoClient = new MongoClient(MONGO_URI);
      await mongoClient.connect();
      mongoDb = mongoClient.db(MONGO_DB);
      linksCol = mongoDb.collection('links');
      filesCol = mongoDb.collection('files');
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('Failed to connect to MongoDB, falling back to lowdb', err);
      mongoClient = null;
    }
  }
}

initDB();

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: UPLOAD_DIR });
const id = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

const useMongo = () => !!(linksCol && filesCol);

app.get('/api/links', async (req, res) => {
  if (useMongo()) {
    const docs = await linksCol.find().sort({ createdAt: -1 }).toArray();
    return res.json(docs || []);
  }
  await db.read();
  res.json(db.data.links || []);
});

app.post('/api/links', async (req, res) => {
  const { title, url } = req.body || {};
  if (!title || !url) return res.status(400).json({ error: 'title and url required' });
  const newLink = { id: Date.now().toString(), title, url, createdAt: new Date().toISOString() };
  if (useMongo()) {
    await linksCol.insertOne(newLink);
    return res.json(newLink);
  }
  db.data.links.unshift(newLink);
  await db.write();
  res.json(newLink);
});

app.delete('/api/links/:id', async (req, res) => {
  const { id } = req.params;
  if (useMongo()) {
    await linksCol.deleteOne({ id });
    return res.json({ ok: true });
  }
  db.data.links = db.data.links.filter((l) => l.id !== id);
  await db.write();
  res.json({ ok: true });
});

app.post('/api/upload', upload.array('files'), async (req, res) => {
  const createdFiles = [];
  for (const f of (req.files || [])) {
    const fileId = id();
    const ext = path.extname(f.originalname);
    const storedName = fileId + ext;
    const destPath = path.join(UPLOAD_DIR, storedName);
    // rename/move file from multer's tmp location to our name
    fs.renameSync(f.path, destPath);
    const meta = {
      id: fileId,
      name: f.originalname,
      storedName,
      mime: f.mimetype,
      size: f.size,
      url: `${req.protocol}://${req.get('host')}/uploads/${encodeURIComponent(storedName)}`,
      createdAt: new Date().toISOString(),
    };
    if (useMongo()) {
      await filesCol.insertOne(meta);
    } else {
      await db.read();
      db.data.files.unshift(meta);
      await db.write();
    }
    createdFiles.push(meta);
  }
  res.json(createdFiles);
});

app.get('/api/files', async (req, res) => {
  if (useMongo()) {
    const docs = await filesCol.find().sort({ createdAt: -1 }).toArray();
    return res.json(docs || []);
  }
  await db.read();
  res.json(db.data.files || []);
});

app.delete('/api/files/:id', async (req, res) => {
  const { id } = req.params;
  if (useMongo()) {
    const file = await filesCol.findOne({ id });
    if (file) {
      const p = path.join(UPLOAD_DIR, file.storedName);
      try { fs.unlinkSync(p); } catch (e) {}
      await filesCol.deleteOne({ id });
    }
    return res.json({ ok: true });
  }
  await db.read();
  const file = db.data.files.find((f) => f.id === id);
  if (file) {
    const p = path.join(UPLOAD_DIR, file.storedName);
    try { fs.unlinkSync(p); } catch (e) {}
    db.data.files = db.data.files.filter((f) => f.id !== id);
    await db.write();
  }
  res.json({ ok: true });
});

app.use('/uploads', express.static(UPLOAD_DIR));

app.listen(PORT, () => {
  console.log(`Notes server listening on http://localhost:${PORT}`);
});

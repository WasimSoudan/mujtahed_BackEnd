import express from 'express';
import multer from 'multer';
import cors from 'cors';
const app = express();
const port = 3000;

import { createClient } from '@supabase/supabase-js';

// Replace these with your Supabase project credentials
const supabaseUrl = 'https://sxkjamuhqskexxhhtjrl.supabase.co';
const supabaseKey =
 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4a2phbXVocXNrZXh4aGh0anJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1NjcwMDEsImV4cCI6MjA0OTE0MzAwMX0.nZXd5VY9NYdrDJC0ckMRUPQ-J8oP_2kwwaxeWAXkjE0';

const supabase = createClient(supabaseUrl, supabaseKey);
app.use(express.json());
const upload = multer({
 storage: multer.memoryStorage(),
});
app.use((_, res, next) => {
 res.set('Access-Control-Allow-Origin', '*');
 next();
});

app.use(cors());

app.get('/user', async (req, res) => {
 try {
  const { data, error } = await supabase.from('Users').select('*');

  if (error) throw Error('Error');

  return res.status(200).json({ success: true, data });
 } catch (e) {
  console.error(e);
 }
});

app.post('/user', async (req, res) => {
 try {
  const { name } = req.body;

  const { data, error } = await supabase.from('Users').insert([{ name }]).select();

  if (error) throw Error('Stop ');

  return res.status(200).json({ success: true, data });
 } catch (e) {
  console.error(e);
 }
});

app.put('/user', async (req, res) => {
 try {
  const { name } = req.body;
  const { id } = req.query;

  const { data, error } = await supabase.from('Users').update({ name }).eq('id', id).select();
  if (error) throw Error('Stop ');

  return res.status(200).json({ success: true, data });
 } catch (e) {
  console.error(e);
 }
});

app.post('/upload', upload.single('file'), async (req, res) => {
 try {
  const file = req.file;

  if (!file) {
   return res.status(400).send({ error: 'No file uploaded' });
  }

  // Upload file to Supabase Storage
  const { data, error } = await supabase.storage
   .from('documents') // Your bucket name
   .upload(`${Date.now()}-${file.originalname}`, file.buffer, {
    contentType: file.mimetype,
    upsert: false,
   });

  if (error) {
   console.error('Error uploading file:', error);
   return res.status(500).send({ error: 'File upload failed' });
  }

  res.status(200).send({ message: 'File uploaded successfully', path: data.path });
 } catch (err) {
  console.error('Unexpected error:', err);
  res.status(500).send({ error: 'Internal Server Error' });
 }
});

app.get('/file/:filePath', async (req, res) => {
 try {
  const filePath = req.params.filePath;

  const { data, error } = await supabase.storage.from('documents').getPublicUrl(filePath);
  if (error) {
   console.error('Error generating public URL:', error);
   return res.status(500).send({ error: 'Failed to generate public URL' });
  }

  res.status(200).send({ publicUrl: data.publicUrl });
 } catch (err) {
  console.error('Unexpected error:', err);
  res.status(500).send({ error: 'Internal Server Error' });
 }
});

app.delete('/user', async (req, res) => {
 try {
  const { id } = req.query;

  const { data, error } = await supabase.from('Users').delete().eq('id', id);
  if (error) throw Error('Stop ');

  return res.status(200).json({ success: true, message: 'the user was deleted ' });
 } catch (e) {
  console.error(e);
 }
});
app.get('/note', async (req, res) => {
 const { user_id } = req.query;
 const { data, error } =
  user_id > 0
   ? await supabase.from('V_Note').select('*').eq('user_id', user_id)
   : await supabase.from('V_Note').select('*');

 if (error) throw Error('Error');

 return res.status(200).json({ success: true, data });
});
app.post('/note', async (req, res) => {
 const { user_id, note } = req.body;
 try {
  const { data, error } = await supabase.from('Notes').insert([{ user_id, note }]).select();

  if (error) {
   console.error('Database error:', error);
   return res.status(500).json({ success: false, error: error.message });
  }

  return res.status(200).json({ success: true, data });
 } catch (err) {
  console.error('Unexpected error:', err);
  return res.status(500).json({ success: false, error: 'Unexpected server error' });
 }
});

app.put('/note', async (req, res) => {
 const { note } = req.body;
 const { id } = req.query;
 try {
  const { data, error } = await supabase.from('Notes').update({ note }).eq('id', id).select();

  if (error) {
   console.error('Database error:', error);
   return res.status(500).json({ success: false, error: error.message });
  }

  return res.status(200).json({ success: true, data });
 } catch (err) {
  console.error('Unexpected error:', err);
  return res.status(500).json({ success: false, error: 'Unexpected server error' });
 }
});
app.delete('/note', async (req, res) => {
 const { id } = req.query;
 try {
  const { data, error } = await supabase.from('Notes').delete().eq('id', id);

  if (error) {
   console.error('Database error:', error);
   return res.status(500).json({ success: false, error: error.message });
  }

  return res.status(200).json({ success: true });
 } catch (err) {
  console.error('Unexpected error:', err);
  return res.status(500).json({ success: false, error: 'Unexpected server error' });
 }
});

app.post('/login', async (req, res) => {
 const { username } = req.body;
 try {
  const { data, error } = await supabase.from('Users').select().eq('name', username);

  if (error) {
   console.error('Database error:', error);
   return res.status(500).json({ success: false, error: error.message });
  }

  return res.status(200).json({ success: data.length > 0 ? true : false, data });
 } catch (err) {
  console.error('Unexpected error:', err);
  return res.status(500).json({ success: false, error: 'Unexpected server error' });
 }
});

app.listen(port, () => {
 console.log(`Server running on port ${port}`);
});

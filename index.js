import express from 'express';

const app = express();
const port = 3000;

import { createClient } from '@supabase/supabase-js';

// Replace these with your Supabase project credentials
const supabaseUrl = 'https://sxkjamuhqskexxhhtjrl.supabase.co';
const supabaseKey =
 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4a2phbXVocXNrZXh4aGh0anJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1NjcwMDEsImV4cCI6MjA0OTE0MzAwMX0.nZXd5VY9NYdrDJC0ckMRUPQ-J8oP_2kwwaxeWAXkjE0';

const supabase = createClient(supabaseUrl, supabaseKey);
app.use(express.json());

// app.use(express.static('public'));

app.get('/', async (req, res) => {
 try {
  const { data, error } = await supabase.from('Users').select('*');
  console.log(data);

  if (error) throw Error('Error');

  return res.status(200).json({ success: true, data });
 } catch (e) {
  console.error(e);
 }
});

app.post('/', async (req, res) => {
 try {
  const { name } = req.body;

  const { data, error } = await supabase.from('Users').insert([{ name }]).select();

  if (error) throw Error('Stop ');

  return res.status(200).json({ success: true, data });
 } catch (e) {
  console.error(e);
 }
});

app.put('/', async (req, res) => {
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

app.delete('/', async (req, res) => {
 try {
  const { id } = req.query;

  const { data, error } = await supabase.from('Users').delete().eq('id', id);
  if (error) throw Error('Stop ');

  return res.status(200).json({ success: true, message: 'the user was deleted ' });
 } catch (e) {
  console.error(e);
 }
});

app.listen(port, () => {
 console.log(`Server running on port ${port}`);
});

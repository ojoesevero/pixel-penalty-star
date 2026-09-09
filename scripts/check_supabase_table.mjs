import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const url = process.env.VITE_SUPABASE_URL;
const key = process.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase URL:', url ? 'Defined' : 'Missing');
console.log('Supabase Key:', key ? 'Defined' : 'Missing');

if (url && key) {
  const supabase = createClient(url, key);
  const { data, error } = await supabase.from('soccer_clubs').select('count', { count: 'exact', head: true });
  console.log('Table soccer_clubs check:', error ? error.message : `Table exists! Count: ${data}`);
}

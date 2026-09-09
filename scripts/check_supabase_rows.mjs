import { createClient } from '@supabase/supabase-js';

const url = process.env.VITE_SUPABASE_URL;
const key = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(url, key);
const { data, error } = await supabase.from('soccer_clubs').select('*').limit(5);

console.log('Error?', error ? error.message : 'None');
console.log('Rows count in soccer_clubs:', data ? data.length : 'No data');
if (data && data.length > 0) {
  console.log('First row:', data[0]);
}

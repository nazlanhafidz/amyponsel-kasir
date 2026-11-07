import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ppuajiqhalaleuutdohw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwdWFqaXFoYWxhbGV1dXRkb2h3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQwNjM3MzEsImV4cCI6MjEwOTYzOTczMX0.EEGZycBp-Stiy0MY2iAPq_TR2Se_cbjz3FeJDXNg9BQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ppuajiqhalaleuutdohw.supabase.co';
const supabaseAnonKey = 'PASTE_ANON_KEY_ANDA_DI_SINI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://fvkkgwagcxinsdwdzbdb.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2a2tnd2FnY3hpbnNkd2R6YmRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk2MzQ0ODYsImV4cCI6MjEwNTIxMDQ4Nn0.YCrT70U8TE7Ctt7DXcsE7jK0pal_aN2TpHkzE4Fi8RY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

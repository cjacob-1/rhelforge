import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not configured. Some features may not work.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      guides: {
        Row: {
          id: string;
          title: string;
          description: string;
          category: string;
          difficulty: 'beginner' | 'intermediate' | 'advanced';
          content: string;
          bash_script: string;
          python_script: string;
          physical_steps: string;
          aws_steps: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['guides']['Row'], 'id' | 'created_at' | 'updated_at'>;
      };
      chat_history: {
        Row: {
          id: string;
          user_id: string;
          message: string;
          response: string;
          bash_script: string;
          python_script: string;
          created_at: string;
        };
      };
    };
  };
};

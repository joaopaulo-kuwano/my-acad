
import { createClient } from '@supabase/supabase-js'

const key = process.env.NEXT_PUBLIC_SUPABASE_ANON || ''

// Create a single supabase client for interacting with your database
export const supabase = createClient('https://bzpqxehliskfgqhxgmos.supabase.co', key)
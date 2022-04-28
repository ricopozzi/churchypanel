import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://hdmkorzncbcwjgebttwd.supabase.co'
const SUPABASE_ANON_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkbWtvcnpuY2Jjd2pnZWJ0dHdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDc1MjQ2MTgsImV4cCI6MTk2MzEwMDYxOH0.uewHAJVXRzD6FTo5Fm2I6kaxEuPWq27QdnKbn8WFOGc'

const supabaseUrl = SUPABASE_URL
const supabaseAnonKey = SUPABASE_ANON_KEY

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
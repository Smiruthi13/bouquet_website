-- ==============================================================================
-- BLOOMÉ BOUQUET WEBSITE - SUPABASE DATABASE SCHEMA & POLICIES
-- Run this script in the Supabase SQL Editor: https://supabase.com/dashboard/project/fvkkgwagcxinsdwdzbdb/sql
-- ==============================================================================

-- 1. Create the orders table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT UNIQUE NOT NULL,
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT DEFAULT 'Bengaluru',
    gift_message TEXT,
    total_bouquets_count INT NOT NULL DEFAULT 1,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    subtotal NUMERIC NOT NULL,
    delivery_fee NUMERIC NOT NULL DEFAULT 0,
    grand_total NUMERIC NOT NULL,
    status TEXT NOT NULL DEFAULT 'Pending', -- Pending, Confirmed, Preparing, Out for Delivery, Delivered, Cancelled
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Allow customers (anonymous/authenticated) to insert new orders
CREATE POLICY "Allow public insert to orders"
ON public.orders
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 4. Policy: Allow reading orders (for public/admin view)
CREATE POLICY "Allow public select on orders"
ON public.orders
FOR SELECT
TO anon, authenticated
USING (true);

-- 5. Policy: Allow update status on orders
CREATE POLICY "Allow update on orders"
ON public.orders
FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- 6. Policy: Allow delete on orders (for admin cleanup)
CREATE POLICY "Allow delete on orders"
ON public.orders
FOR DELETE
TO anon, authenticated
USING (true);

-- Optional: Create index for faster querying by status and date
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);

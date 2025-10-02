# Supabase Setup Guide

## Environment Variables

Add your Supabase credentials to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://bbiyeawftheyqalcengo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### Getting Your Supabase Anon Key

1. Go to your Supabase project dashboard: https://supabase.com/dashboard/project/bbiyeawftheyqalcengo
2. Navigate to **Settings** → **API**
3. Copy the **anon/public** key
4. Replace `your_supabase_anon_key_here` in `.env.local`

## Project Structure

```
frontend/
├── src/
│   ├── lib/
│   │   ├── supabase.ts          # Supabase client initialization
│   │   └── api/
│   │       └── nhom-hanghoa.ts  # API functions for product groups
│   ├── types/
│   │   └── database.types.ts    # TypeScript types for database
│   └── app/
│       └── example/
│           └── page.tsx          # Example page using Supabase
└── .env.local                    # Environment variables (not in git)
```

## Usage Examples

### 1. Fetching Data

```typescript
import { getNhomHangHoa } from '@/lib/api/nhom-hanghoa';

const data = await getNhomHangHoa();
```

### 2. Direct Supabase Client Usage

```typescript
import { supabase } from '@/lib/supabase';

// Select all records
const { data, error } = await supabase
  .from('tbl_nhom_hanghoa')
  .select('*');

// Select with filter
const { data, error } = await supabase
  .from('tbl_nhom_hanghoa')
  .select('*')
  .eq('ma_nhom_hanghoa', 'KM');

// Insert data
const { data, error } = await supabase
  .from('tbl_nhom_hanghoa')
  .insert({
    ma_nhom_hanghoa: 'NEW',
    ten_nhom_hanghoa: 'New Category',
    ghichu: 'Description'
  });

// Update data
const { data, error } = await supabase
  .from('tbl_nhom_hanghoa')
  .update({ ten_nhom_hanghoa: 'Updated Name' })
  .eq('ma_nhom_hanghoa', 'KM');

// Delete data
const { data, error } = await supabase
  .from('tbl_nhom_hanghoa')
  .delete()
  .eq('ma_nhom_hanghoa', 'KM');
```

### 3. Using in Server Components (Next.js App Router)

```typescript
// app/products/page.tsx
import { supabase } from '@/lib/supabase';

export default async function ProductsPage() {
  const { data } = await supabase
    .from('tbl_nhom_hanghoa')
    .select('*');

  return (
    <div>
      {data?.map((item) => (
        <div key={item.ma_nhom_hanghoa}>
          {item.ten_nhom_hanghoa}
        </div>
      ))}
    </div>
  );
}
```

### 4. Using in Client Components

```typescript
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function ClientComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase
        .from('tbl_nhom_hanghoa')
        .select('*');
      
      if (data) setData(data);
    }
    
    fetchData();
  }, []);

  return <div>{/* render data */}</div>;
}
```

## Running the Development Server

```bash
npm run dev
```

Visit http://localhost:3000/example to see the example page.

## Next Steps

1. **Add your Supabase Anon Key** to `.env.local`
2. **Test the connection** by visiting `/example` route
3. **Create more API functions** in `src/lib/api/` for other tables
4. **Add TypeScript types** for other database tables in `src/types/database.types.ts`

## Resources

- [Supabase JavaScript Client Docs](https://supabase.com/docs/reference/javascript)
- [Next.js with Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Supabase Auth](https://supabase.com/docs/guides/auth)

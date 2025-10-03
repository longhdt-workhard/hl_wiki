# Supabase Authentication Setup

## Overview
This application now includes Supabase authentication with protected routes.

## Features Implemented

### 1. **Authentication Context** (`src/contexts/AuthContext.tsx`)
- Manages user authentication state
- Provides `signIn`, `signUp`, and `signOut` functions
- Automatically syncs with Supabase auth state changes

### 2. **Login Page** (`src/app/login/page.tsx`)
- Clean, modern login UI
- Email/password authentication
- Auto-redirects to home if already logged in
- Error handling and loading states

### 3. **Protected Routes Middleware** (`src/middleware.ts`)
- Automatically redirects unauthenticated users to `/login`
- Redirects authenticated users away from `/login` to home
- Protects all routes except login page

### 4. **Navigation Bar** (`src/components/Navbar.tsx`)
- Shows user email
- Logout button
- Navigation links to main pages
- Only visible when user is authenticated

### 5. **Protected Route Component** (`src/components/ProtectedRoute.tsx`)
- Optional wrapper for additional route protection
- Shows loading state while checking auth

## Setup Instructions

### 1. Enable Authentication in Supabase

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** → **Providers**
3. Enable **Email** provider
4. Configure email templates if needed

### 2. Create Your First User

**Option A: Using Supabase Dashboard**
1. Go to **Authentication** → **Users**
2. Click **Add user**
3. Enter email and password
4. Click **Create user**

**Option B: Enable Sign Up (if you want public registration)**
- Update `src/app/login/page.tsx` to include a sign-up form
- Or create a separate `/signup` page

### 3. Environment Variables

Make sure these are set in your `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Production Deployment

Set the same environment variables in your hosting platform:
- **Vercel**: Project Settings → Environment Variables
- **Netlify**: Site Settings → Environment Variables
- **Other platforms**: Check their documentation

## Usage

### Using the Auth Hook

```tsx
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, signOut } = useAuth();
  
  return (
    <div>
      <p>Logged in as: {user?.email}</p>
      <button onClick={signOut}>Logout</button>
    </div>
  );
}
```

### Protecting Individual Components

```tsx
import ProtectedRoute from '@/components/ProtectedRoute';

export default function MyPage() {
  return (
    <ProtectedRoute>
      <div>This content is protected</div>
    </ProtectedRoute>
  );
}
```

## Testing

1. Start the development server: `npm run dev`
2. Navigate to `http://localhost:3000`
3. You should be redirected to `/login`
4. Log in with your Supabase user credentials
5. After login, you'll be redirected to the home page
6. The navbar will show your email and logout button

## Security Notes

- The middleware protects all routes by default
- Session tokens are stored in cookies
- The `NEXT_PUBLIC_` prefix makes env vars available in the browser (safe for Supabase public keys)
- Never expose your Supabase service role key in client-side code

## Customization

### To Allow Public Access to Specific Routes

Update `src/middleware.ts` to exclude routes:

```typescript
// If user is not signed in and trying to access protected routes, redirect to login
const publicRoutes = ['/login', '/about', '/contact'];
if (!token && !publicRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
  // redirect to login
}
```

### To Add Sign Up Functionality

Create `src/app/signup/page.tsx`:

```tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';

export default function SignUpPage() {
  const { signUp } = useAuth();
  // ... implement sign up form
}
```

## Troubleshooting

### "Invalid login credentials" error
- Verify the user exists in Supabase dashboard
- Check email/password are correct
- Ensure Email provider is enabled in Supabase

### Infinite redirect loop
- Check middleware configuration
- Verify environment variables are set correctly
- Clear browser cookies and try again

### User not persisting after refresh
- Check that cookies are being set correctly
- Verify Supabase URL and keys are correct
- Check browser console for errors

# Customer Dashboard Implementation Guide

## Overview
A complete Customer Dashboard has been added to the Palma e-commerce platform, fully integrated with Supabase for authentication and data management.

## New Files Created

### 1. **Configuration & Setup**
- `lib/supabase.ts` - Supabase client initialization with TypeScript types
- `context/auth-context.tsx` - Authentication context for user session management
- `.env.example` - Environment variables template

### 2. **Custom Hooks**
- `hooks/use-supabase.ts` - Custom hooks for Supabase operations:
  - `useUserProfile()` - Fetch and update user profile
  - `useUserOrders()` - Fetch user orders with filtering
  - `useOrderDetails()` - Fetch detailed order information with items

### 3. **Dashboard Components**
- `components/dashboard-order-history.tsx` - Display list of user orders
- `components/dashboard-profile-card.tsx` - User profile display
- `components/dashboard-delivery-tracking.tsx` - Order delivery status tracking

### 4. **Dashboard Pages**
- `app/dashboard/layout.tsx` - Dashboard layout with sidebar navigation
- `app/dashboard/page.tsx` - Dashboard overview/home page
- `app/dashboard/orders/page.tsx` - Orders listing page
- `app/dashboard/orders/[id]/page.tsx` - Individual order details page
- `app/dashboard/profile/page.tsx` - User profile management

### 5. **Authentication Pages**
- `app/auth/login/page.tsx` - User login page
- `app/auth/signup/page.tsx` - User registration page

## Features

### Authentication
- Email/password signup and login with Supabase Auth
- Automatic session management
- Protected routes (dashboard requires authentication)
- User logout functionality
- Profile creation on signup

### Customer Dashboard
**Overview Page:**
- Quick stats (total orders, pending orders, delivered orders, total spent)
- Recent orders preview
- Quick action cards

**Orders Page:**
- List all customer orders
- View order status (Pending, Processing, Shipped, Delivered, Cancelled)
- Click to view order details

**Order Details:**
- Full order information
- Delivery tracking with visual progress
- Order items with prices
- Shipping details
- Payment method information

**Profile Page:**
- View profile information
- Edit profile (name, phone, address, city, state, postal code)
- Member since date
- Profile update form with validation

### Header Integration
- User menu dropdown (desktop)
- Dashboard link for logged-in users
- Sign In/Sign Up links for anonymous users
- Logout button
- Mobile responsive navigation

## Environment Setup

### 1. Install Dependencies
```bash
pnpm install
# or
npm install
# or
yarn install
```

### 2. Create `.env.local` File
Copy `.env.example` and fill in your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Supabase Setup
1. Go to [Supabase](https://supabase.com)
2. Create a new project
3. Run the SQL scripts in `scripts/` folder to create the database schema
4. Get your API credentials from Project Settings > API Keys

## Database Schema

The system uses Supabase PostgreSQL with the following tables:

- **profiles** - User profile information
- **products** - Product catalog
- **orders** - Customer orders
- **order_items** - Line items in orders
- **cart** - Shopping cart (optional)
- **reviews** - Product reviews (optional)

See `scripts/init-db.sql` for the complete schema.

## Usage

### For Users
1. Click "Sign Up" to create an account
2. Enter email, password, and full name
3. Confirm email (if email verification is enabled)
4. Login with credentials
5. Access dashboard from header user menu
6. View orders, profile, and settings

### For Developers

#### Using Auth Context
```tsx
import { useAuth } from '@/context/auth-context'

export default function MyComponent() {
  const { user, isLoading, signOut } = useAuth()
  
  if (isLoading) return <div>Loading...</div>
  if (!user) return <div>Not logged in</div>
  
  return <div>Welcome {user.email}</div>
}
```

#### Using Supabase Hooks
```tsx
import { useUserOrders, useUserProfile } from '@/hooks/use-supabase'

export default function MyDashboard() {
  const { user } = useAuth()
  const { orders, loading } = useUserOrders(user?.id)
  const { profile, updateProfile } = useUserProfile(user?.id)
  
  // Use orders and profile
}
```

#### Direct Supabase Access
```tsx
import { supabase } from '@/lib/supabase'

const { data, error } = await supabase
  .from('orders')
  .select('*')
  .eq('user_id', userId)
```

## Routes

### Public Routes
- `/` - Home page
- `/products` - Product listing
- `/about` - About page
- `/contact` - Contact page
- `/cart` - Shopping cart
- `/auth/login` - Login page
- `/auth/signup` - Registration page
- `/admin` - Admin dashboard

### Protected Routes (Require Authentication)
- `/dashboard` - Dashboard home (redirects to login if not authenticated)
- `/dashboard/orders` - Orders list
- `/dashboard/orders/[id]` - Order details
- `/dashboard/profile` - Profile management
- `/checkout` - Checkout page (when implemented)

## Styling & Design
- Uses Tailwind CSS for styling
- Shadcn/ui components for consistency
- Responsive design (mobile-first)
- Dark/light mode support (via next-themes)
- Consistent color scheme with primary/accent colors

## Status Badges
Orders display status with color coding:
- **Pending** - Gray
- **Processing** - Yellow
- **Shipped** - Blue
- **Delivered** - Green
- **Cancelled** - Red

## Delivery Tracking
Visual step-by-step tracking:
1. Order Placed (Clock icon)
2. Processing (Package icon)
3. Shipped (Truck icon)
4. Delivered (Check Circle icon)

## Security Features
- Password hashing via Supabase Auth
- Row Level Security (RLS) enabled on all user-specific tables
- Protected routes with authentication checks
- User can only access their own data
- Secure API calls through Supabase client

## Next Steps / Future Enhancements

1. **Email Verification** - Confirm email before access
2. **Two-Factor Authentication** - Enhanced security
3. **Order History Export** - Download as PDF/CSV
4. **Wishlist** - Save favorite products
5. **Address Book** - Multiple shipping addresses
6. **Order Notifications** - Email/SMS updates
7. **Returns/Refunds** - Return management system
8. **Loyalty Points** - Reward system
9. **Product Reviews** - Customer ratings and comments
10. **Social Login** - Google, Facebook authentication

## Troubleshooting

### "useAuth must be used within AuthProvider"
Make sure `AuthProvider` is wrapped in `app/layout.tsx` around your components.

### Supabase connection errors
1. Check `.env.local` has correct credentials
2. Verify Supabase project is active
3. Check API keys are not expired
4. Ensure CORS is configured in Supabase

### Orders not showing in dashboard
1. Verify orders exist in the database
2. Check user_id matches authenticated user
3. Check RLS policies allow reading user's own orders
4. Verify order status values are valid

## Support
For issues or questions, refer to:
- Supabase Documentation: https://supabase.com/docs
- Next.js Documentation: https://nextjs.org/docs
- Shadcn/ui Documentation: https://ui.shadcn.com

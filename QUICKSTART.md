# Quick Start Guide - Customer Dashboard

## Setup Steps

### Step 1: Install Dependencies
```bash
pnpm install
```

### Step 2: Create Environment File
Create `.env.local` in the root folder:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### Step 3: Setup Supabase Database
1. Go to your Supabase project
2. Open SQL Editor
3. Copy the contents of `scripts/init-db.sql`
4. Paste and run in the SQL Editor
5. This creates all tables and enables RLS

### Step 4: Run Development Server
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Feature Walkthrough

### 1. User Registration
- Go to home page
- Click "Sign Up" button in header
- Fill in: Full Name, Email, Password
- Account is created and you can login

### 2. User Login
- Click "Sign In" in header
- Enter email and password
- Redirects to dashboard on success

### 3. Dashboard Features

**Overview:**
- See quick stats: Total Orders, Pending, Delivered, Total Spent
- View recent order preview
- Quick action links

**Orders Page:**
- View all your orders
- See order status and amounts
- Click "View Details" to see full order

**Order Details:**
- Complete order information
- Visual delivery tracking status
- List of items ordered with prices
- Shipping address and phone

**Profile Page:**
- View your profile information
- Edit your details:
  - Full Name
  - Phone Number
  - Address
  - City, State, Postal Code
- Save changes with "Save Changes" button

### 4. Header Features
- Shop products
- View/manage cart
- User menu (when logged in)
  - Dashboard link
  - Logout button
- Sign In/Sign Up (when logged out)

## Key Components

### Dashboard Sidebar
- Overview
- Orders
- Profile
- Back to Shop
- Logout

### Protected Routes
These routes require you to be logged in:
- `/dashboard` - redirects to login if not authenticated
- `/dashboard/orders`
- `/dashboard/orders/[id]`
- `/dashboard/profile`

### Public Routes
Anyone can access:
- `/` - Home
- `/products` - Shop
- `/about` - About
- `/contact` - Contact
- `/auth/login` - Login
- `/auth/signup` - Register

## Testing the Dashboard

### Test User Data
To test orders and delivery tracking:

1. Create a test user account via signup
2. Manually insert test order data in Supabase:

```sql
-- Insert a test order
INSERT INTO orders (
  user_id, 
  order_number, 
  total_amount,
  shipping_address,
  shipping_city,
  shipping_state,
  phone_number,
  payment_method,
  status
) VALUES (
  'your-user-id-here',
  'ORD-001-2024',
  45000,
  '123 Main Street',
  'Lagos',
  'Lagos',
  '08012345678',
  'Bank Transfer',
  'Shipped'
);
```

You can find your user ID from:
1. Go to Supabase Dashboard
2. Authentication > Users
3. Copy the user ID

## File Structure

```
app/
├── dashboard/
│   ├── layout.tsx          # Dashboard layout with sidebar
│   ├── page.tsx            # Overview/home
│   ├── orders/
│   │   ├── page.tsx        # Orders list
│   │   └── [id]/
│   │       └── page.tsx    # Order details
│   └── profile/
│       └── page.tsx        # Profile management
├── auth/
│   ├── login/
│   │   └── page.tsx        # Login page
│   └── signup/
│       └── page.tsx        # Register page
└── layout.tsx              # Root layout

components/
├── dashboard-order-history.tsx      # Orders list component
├── dashboard-profile-card.tsx       # Profile component
├── dashboard-delivery-tracking.tsx  # Tracking component
└── header.tsx                       # Updated header

context/
├── auth-context.tsx        # Authentication context
└── (other contexts)

hooks/
├── use-supabase.ts         # Custom Supabase hooks
└── (other hooks)

lib/
├── supabase.ts             # Supabase client setup
└── utils.ts
```

## Common Issues & Solutions

### Issue: "NEXT_PUBLIC_SUPABASE_URL is not defined"
**Solution:** Check `.env.local` file has correct variable names and restart dev server

### Issue: Login doesn't work
**Solution:** 
1. Verify Supabase project is active
2. Check credentials in `.env.local`
3. Make sure database schema is created

### Issue: Orders not showing
**Solution:**
1. Make sure test data is inserted in database
2. Verify the user_id matches the logged-in user
3. Check database RLS policies are configured

### Issue: Can't access dashboard
**Solution:**
1. Make sure you're logged in
2. Check browser console for errors
3. Verify AuthProvider is in root layout.tsx

## Next Steps

After setup:
1. Customize colors and branding
2. Add more dashboard features
3. Setup email notifications
4. Configure payment gateway
5. Add order tracking API integration
6. Setup email verification
7. Add 2FA support

## Resources

- [Supabase Docs](https://supabase.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn/ui](https://ui.shadcn.com)

## Support

For detailed documentation, see `CUSTOMER_DASHBOARD.md`

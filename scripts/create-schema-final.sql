-- Create profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  postal_code TEXT,
  country TEXT DEFAULT 'Nigeria',
  avatar_url TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price_ngn DECIMAL(10, 2) NOT NULL,
  size_liters DECIMAL(5, 2) NOT NULL,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  image_url TEXT,
  status TEXT DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create carousel items table
CREATE TABLE IF NOT EXISTS carousel_items (
  id BIGSERIAL PRIMARY KEY,
  product_id BIGSERIAL NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id BIGSERIAL PRIMARY KEY,
  product_id BIGSERIAL NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create cart table
CREATE TABLE IF NOT EXISTS cart (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id BIGSERIAL NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  order_number TEXT UNIQUE NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'NGN',
  status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled')),
  payment_method TEXT,
  shipping_address TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order items table
CREATE TABLE IF NOT EXISTS order_items (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGSERIAL NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id BIGSERIAL NOT NULL,
  quantity INTEGER NOT NULL,
  price_ngn DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for products (public read)
CREATE POLICY "Products are publicly readable" ON products
  FOR SELECT USING (true);

-- RLS Policies for cart
CREATE POLICY "Users can view their own cart" ON cart
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own cart" ON cart
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own cart" ON cart
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own cart items" ON cart
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for orders
CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated users can update orders" ON orders
  FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can view all orders" ON orders
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- RLS Policies for order items
CREATE POLICY "Users can view their order items" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()
    )
  );

-- RLS Policies for reviews
CREATE POLICY "Reviews are publicly readable" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Users can create reviews" ON reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Insert sample products
INSERT INTO products (name, description, price_ngn, size_liters, stock_quantity, image_url, status) VALUES
('Premium Red Palm Oil 250ml', 'Pure, unrefined red palm oil in 250ml bottle. Perfect for trying our premium oil.', 5500, 0.25, 50, 'palm-oil-small.jpg', 'Active'),
('Premium Red Palm Oil 500ml', 'Pure, unrefined red palm oil in 500ml bottle. Perfect for cooking and skincare.', 8500, 0.5, 45, 'palm-oil-bottle.jpg', 'Active'),
('Premium Red Palm Oil 1L', 'Value package for families. Premium quality red palm oil in 1 liter bottle.', 15000, 1.0, 32, 'palm-oil-bottle.jpg', 'Active'),
('Premium Red Palm Oil 2L Bulk', 'Bulk size for restaurants and serious cooking enthusiasts. 2 liters of premium oil.', 28000, 2.0, 8, 'palm-oil-bulk.jpg', 'Active'),
('Red Palm Oil Gift Set', 'Beautiful gift set with two premium bottles. Perfect for special occasions.', 12000, 1.0, 12, 'palm-oil-gift-set.jpg', 'Active');

-- Insert carousel items
INSERT INTO carousel_items (product_id, title, description, image_url, order_index) VALUES
(1, 'Premium 250ml Bottle', 'Perfect for trying our premium Nigerian red palm oil', 'palm-oil-small.jpg', 1),
(2, 'Premium 500ml Bottle', 'Most popular size for home cooking and beauty routines', 'palm-oil-bottle.jpg', 2),
(3, 'Premium 1L Bottle', 'Value package for families who love quality red palm oil', 'palm-oil-bottle.jpg', 3),
(4, 'Bulk 2L Container', 'For restaurants and serious cooking enthusiasts', 'palm-oil-bulk.jpg', 4),
(5, 'Premium Gift Set', 'Beautiful packaging perfect for special occasions and gifts', 'palm-oil-gift-set.jpg', 5);

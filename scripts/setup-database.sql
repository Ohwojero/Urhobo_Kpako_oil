-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price BIGINT NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  status VARCHAR(50) NOT NULL DEFAULT 'Active',
  rating DECIMAL(3,1) DEFAULT 5.0,
  reviews INT DEFAULT 0,
  image_url VARCHAR(500),
  liter_size VARCHAR(50),
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on status for faster queries
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);

-- Insert sample products
INSERT INTO products (name, description, price, stock, status, rating, reviews, image_url, liter_size, in_stock)
VALUES
  (
    'Premium Red Palm Oil 250ml',
    'Small size, perfect for trying our premium oil.',
    5500,
    25,
    'Active',
    4.7,
    89,
    '/palm-oil-small.jpg',
    '250ml',
    true
  ),
  (
    'Premium Red Palm Oil 500ml',
    'Pure, unrefined red palm oil. Perfect for cooking and skincare.',
    8500,
    45,
    'Active',
    4.8,
    156,
    '/palm-oil-bottle.jpg',
    '500ml',
    true
  ),
  (
    'Premium Red Palm Oil 1L',
    'Value package for families. Premium quality, long-lasting.',
    15000,
    32,
    'Active',
    4.9,
    243,
    '/palm-oil-bottle.jpg',
    '1L',
    true
  ),
  (
    'Premium Red Palm Oil 2L Bulk',
    'Bulk size for restaurants and serious cooking enthusiasts.',
    28000,
    8,
    'Active',
    5.0,
    34,
    '/palm-oil-bulk.jpg',
    '2L',
    true
  ),
  (
    'Red Palm Oil Gift Set',
    'Beautiful gift set with two premium bottles.',
    12000,
    12,
    'Active',
    4.9,
    67,
    '/palm-oil-gift-set.jpg',
    'Gift Set',
    true
  );

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20),
  shipping_address TEXT NOT NULL,
  total_amount BIGINT NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'Pending',
  payment_method VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create order items table
CREATE TABLE IF NOT EXISTS order_items (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id BIGINT NOT NULL REFERENCES products(id),
  quantity INT NOT NULL,
  price BIGINT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on order_id for faster queries
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);

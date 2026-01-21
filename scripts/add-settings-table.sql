-- Add settings table to existing database
CREATE TABLE IF NOT EXISTS settings (
  id BIGSERIAL PRIMARY KEY,
  business_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  shipping_cost DECIMAL(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'NGN',
  tax_rate DECIMAL(10, 2) NOT NULL DEFAULT 0,
  paystack_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  pay_on_delivery_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for settings
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for settings
CREATE POLICY "Settings are publicly readable" ON settings
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage settings" ON settings
  FOR ALL USING (auth.uid() IS NOT NULL);

-- Insert default settings if table is empty
INSERT INTO settings (business_name, email, phone, address, shipping_cost, currency, tax_rate, paystack_enabled, pay_on_delivery_enabled)
SELECT 'Palma - Premium Nigerian Red Palm Oil', 'info@palma.ng', '+234 (0) 800 PALMA OIL', 'Lagos, Nigeria', 1500, 'NGN', 0, TRUE, TRUE
WHERE NOT EXISTS (SELECT 1 FROM settings LIMIT 1);

-- Migration: Orders tables for purchase history
-- Description: Creates orders and order_items tables to persist store purchases

-- Tabla orders (pedidos completados)
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  stripe_session_id TEXT UNIQUE NOT NULL,
  customer_email TEXT NOT NULL,
  -- Shipping info
  shipping_name TEXT,
  shipping_phone TEXT,
  shipping_address TEXT,
  shipping_address2 TEXT,
  shipping_city TEXT,
  shipping_postal_code TEXT,
  -- Totals (in cents)
  subtotal INTEGER NOT NULL DEFAULT 0,
  discount INTEGER NOT NULL DEFAULT 0,
  shipping_cost INTEGER NOT NULL DEFAULT 0,
  total INTEGER NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'eur',
  -- Status
  status TEXT NOT NULL DEFAULT 'paid' CHECK (status IN ('paid', 'shipped', 'delivered', 'refunded', 'cancelled')),
  notes TEXT,
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla order_items (líneas de cada pedido)
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price INTEGER NOT NULL DEFAULT 0,
  total_price INTEGER NOT NULL DEFAULT 0,
  is_customization BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Índices
CREATE INDEX idx_orders_customer_email ON orders(customer_email);
CREATE INDEX idx_orders_order_number ON orders(order_number);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);

-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Service role full access (webhooks write, admin reads)
CREATE POLICY "Service role full access orders" ON orders
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access order_items" ON order_items
  FOR ALL USING (auth.role() = 'service_role');

-- Trigger para updated_at
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Comentarios
COMMENT ON TABLE orders IS 'Store purchase orders from Stripe checkout (anonymous, linked by email)';
COMMENT ON TABLE order_items IS 'Individual line items for each order';
COMMENT ON COLUMN orders.subtotal IS 'Subtotal in cents before discount';
COMMENT ON COLUMN orders.discount IS 'Discount amount in cents (3x2 promo)';
COMMENT ON COLUMN orders.shipping_cost IS 'Shipping cost in cents';
COMMENT ON COLUMN orders.total IS 'Final total in cents';
COMMENT ON COLUMN orders.status IS 'Order status: paid, shipped, delivered, refunded, cancelled';

import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Hr,
  Preview,
  Row,
  Column,
  Img,
} from '@react-email/components';

interface OrderItem {
  name: string;
  quantity: number;
  amount: number;
  image?: string;
}

interface ShippingInfo {
  name: string;
  phone: string;
  address: string;
  address2?: string;
  city: string;
  postalCode: string;
}

interface OrderConfirmationEmailProps {
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingCost: number;
  total: number;
  shipping: ShippingInfo | null;
  locale: string;
}

const t = (locale: string, key: string) => {
  const texts: Record<string, Record<string, string>> = {
    orderConfirmed: { es: '¡Pedido confirmado!', en: 'Order Confirmed!' },
    orderNumber: { es: 'Pedido', en: 'Order' },
    thanks: {
      es: 'Gracias por tu compra. Aquí tienes el resumen de tu pedido.',
      en: 'Thank you for your purchase. Here is your order summary.',
    },
    orderSummary: { es: 'Resumen del pedido', en: 'Order Summary' },
    qty: { es: 'Cant', en: 'Qty' },
    subtotal: { es: 'Subtotal', en: 'Subtotal' },
    discount: { es: '3x2 Promo', en: '3 for 2 Promo' },
    shipping: { es: 'Envío', en: 'Shipping' },
    shippingFree: { es: 'Gratis', en: 'Free' },
    total: { es: 'Total', en: 'Total' },
    shippingTo: { es: 'Dirección de envío', en: 'Shipping address' },
    footer: {
      es: 'Si tienes alguna pregunta sobre tu pedido, no dudes en contactarnos.',
      en: 'If you have any questions about your order, feel free to contact us.',
    },
  };
  return texts[key]?.[locale] || texts[key]?.en || key;
};

export function OrderConfirmationEmail({
  orderNumber,
  items,
  subtotal,
  discount,
  shippingCost,
  total,
  shipping,
  locale,
}: OrderConfirmationEmailProps) {
  const lang = locale === 'es' ? 'es' : 'en';

  return (
    <Html lang={lang}>
      <Head />
      <Preview>
        {t(lang, 'orderNumber')} #{orderNumber}
      </Preview>
      <Body style={body}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={brandName}>Somos Pasión</Text>
          </Section>

          {/* Title */}
          <Section style={section}>
            <Text style={title}>{t(lang, 'orderConfirmed')}</Text>
            <Text style={orderNumberStyle}>
              {t(lang, 'orderNumber')} #{orderNumber}
            </Text>
            <Text style={subtitle}>{t(lang, 'thanks')}</Text>
          </Section>

          <Section style={section}>
            <Hr style={hr} />
          </Section>

          {/* Items */}
          <Section style={section}>
            <Text style={sectionTitle}>{t(lang, 'orderSummary')}</Text>
            {items.map((item, i) => (
              <Row key={i} style={itemRow}>
                <Column style={itemImageCol}>
                  {item.image ? (
                    <Img
                      src={item.image}
                      alt={item.name}
                      width="56"
                      height="56"
                      style={itemImage}
                    />
                  ) : null}
                </Column>
                <Column style={itemNameCol}>
                  <Text style={itemName}>
                    {item.name} × {item.quantity}
                  </Text>
                </Column>
                <Column style={itemPriceCol}>
                  <Text style={itemPrice}>€{item.amount.toFixed(2)}</Text>
                </Column>
              </Row>
            ))}
          </Section>

          <Section style={section}>
            <Hr style={hr} />
          </Section>

          {/* Totals */}
          <Section style={section}>
            <Row style={totalRow}>
              <Column>
                <Text style={totalLabel}>{t(lang, 'subtotal')}</Text>
              </Column>
              <Column style={rightCol}>
                <Text style={totalValue}>€{subtotal.toFixed(2)}</Text>
              </Column>
            </Row>

            {discount > 0 && (
              <Row style={totalRow}>
                <Column>
                  <Text style={{ ...totalLabel, color: '#10b981' }}>
                    {t(lang, 'discount')}
                  </Text>
                </Column>
                <Column style={rightCol}>
                  <Text style={{ ...totalValue, color: '#10b981' }}>
                    -€{discount.toFixed(2)}
                  </Text>
                </Column>
              </Row>
            )}

            <Row style={totalRow}>
              <Column>
                <Text style={totalLabel}>{t(lang, 'shipping')}</Text>
              </Column>
              <Column style={rightCol}>
                <Text
                  style={{
                    ...totalValue,
                    color: shippingCost === 0 ? '#10b981' : '#ffffff',
                  }}
                >
                  {shippingCost === 0
                    ? t(lang, 'shippingFree')
                    : `€${shippingCost.toFixed(2)}`}
                </Text>
              </Column>
            </Row>

            <Hr style={hr} />

            <Row style={grandTotalRow}>
              <Column>
                <Text style={grandTotalLabel}>{t(lang, 'total')}</Text>
              </Column>
              <Column style={rightCol}>
                <Text style={grandTotalValue}>€{total.toFixed(2)}</Text>
              </Column>
            </Row>
          </Section>

          {/* Shipping */}
          {shipping && (
            <>
              <Section style={section}>
                <Hr style={hr} />
              </Section>
              <Section style={section}>
                <Text style={sectionTitle}>{t(lang, 'shippingTo')}</Text>
                <Text style={shippingText}>{shipping.name}</Text>
                <Text style={shippingText}>{shipping.address}</Text>
                {shipping.address2 && (
                  <Text style={shippingText}>{shipping.address2}</Text>
                )}
                <Text style={shippingText}>
                  {shipping.postalCode} {shipping.city}
                </Text>
                {shipping.phone && (
                  <Text style={shippingText}>{shipping.phone}</Text>
                )}
              </Section>
            </>
          )}

          <Section style={section}>
            <Hr style={hr} />
          </Section>

          {/* Footer */}
          <Section style={section}>
            <Text style={footer}>{t(lang, 'footer')}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const body = {
  backgroundColor: '#000000',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  margin: '0' as const,
  padding: '40px 0',
};

const container = {
  backgroundColor: '#18181b',
  borderRadius: '12px',
  maxWidth: '560px',
  margin: '0 auto',
  border: '1px solid #27272a',
};

const header = {
  backgroundColor: '#18181b',
  borderRadius: '12px 12px 0 0',
  padding: '24px 32px',
  textAlign: 'center' as const,
};

const brandName = {
  color: '#facc15',
  fontSize: '20px',
  fontWeight: '900' as const,
  margin: '0',
  letterSpacing: '-0.02em',
};

const section = {
  padding: '0 32px',
};

const title = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: '900' as const,
  margin: '24px 0 4px',
  textAlign: 'center' as const,
};

const orderNumberStyle = {
  color: '#facc15',
  fontSize: '16px',
  fontWeight: '700' as const,
  fontFamily: 'monospace',
  margin: '0 0 8px',
  textAlign: 'center' as const,
};

const subtitle = {
  color: '#a1a1aa',
  fontSize: '14px',
  margin: '0 0 24px',
  textAlign: 'center' as const,
};

const hr = {
  borderColor: '#27272a',
  margin: '0',
};

const sectionTitle = {
  color: '#a1a1aa',
  fontSize: '12px',
  fontWeight: '700' as const,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
  margin: '20px 0 12px',
};

const itemRow = {
  width: '100%',
  marginBottom: '12px',
};

const itemImageCol = {
  width: '72px',
  verticalAlign: 'middle' as const,
  paddingRight: '12px',
};

const itemImage = {
  width: '56px',
  height: '56px',
  objectFit: 'cover' as const,
  borderRadius: '6px',
  border: '1px solid #27272a',
  display: 'block',
};

const itemNameCol = {
  verticalAlign: 'middle' as const,
};

const itemPriceCol = {
  width: '25%',
  verticalAlign: 'middle' as const,
  textAlign: 'right' as const,
};

const itemName = {
  color: '#ffffff',
  fontSize: '14px',
  margin: '0',
};

const itemPrice = {
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: '700' as const,
  margin: '0',
  textAlign: 'right' as const,
};

const totalRow = {
  width: '100%',
  marginBottom: '6px',
};

const rightCol = {
  textAlign: 'right' as const,
};

const totalLabel = {
  color: '#a1a1aa',
  fontSize: '14px',
  margin: '0',
};

const totalValue = {
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: '600' as const,
  margin: '0',
  textAlign: 'right' as const,
};

const grandTotalRow = {
  width: '100%',
};

const grandTotalLabel = {
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '700' as const,
  margin: '12px 0 20px',
};

const grandTotalValue = {
  color: '#ffffff',
  fontSize: '20px',
  fontWeight: '900' as const,
  margin: '12px 0 20px',
  textAlign: 'right' as const,
};

const shippingText = {
  color: '#a1a1aa',
  fontSize: '14px',
  margin: '0 0 2px',
  lineHeight: '1.5',
};

const footer = {
  color: '#71717a',
  fontSize: '12px',
  textAlign: 'center' as const,
  margin: '20px 0 24px',
};

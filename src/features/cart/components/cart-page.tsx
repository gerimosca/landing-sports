'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Mail, MapPin, Phone, Truck, Globe } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../cart-context';
import { cartItemKey, dorsalExtraCost } from '../types';
import { cn } from '@/shared/lib/utils';
import { trackInitiateCheckout } from '@/features/attribution';
import { useConsent } from '@/features/consent/hooks/use-consent';

const PHONE_PREFIXES = [
  { code: '+1', country: 'US/CA' },
  { code: '+34', country: 'ES' },
  { code: '+44', country: 'UK' },
  { code: '+49', country: 'DE' },
  { code: '+33', country: 'FR' },
  { code: '+39', country: 'IT' },
  { code: '+351', country: 'PT' },
  { code: '+52', country: 'MX' },
  { code: '+54', country: 'AR' },
  { code: '+55', country: 'BR' },
  { code: '+56', country: 'CL' },
  { code: '+57', country: 'CO' },
  { code: '+58', country: 'VE' },
  { code: '+502', country: 'GT' },
  { code: '+503', country: 'SV' },
  { code: '+504', country: 'HN' },
  { code: '+505', country: 'NI' },
  { code: '+506', country: 'CR' },
  { code: '+507', country: 'PA' },
  { code: '+51', country: 'PE' },
  { code: '+593', country: 'EC' },
  { code: '+595', country: 'PY' },
  { code: '+598', country: 'UY' },
  { code: '+591', country: 'BO' },
  { code: '+81', country: 'JP' },
  { code: '+82', country: 'KR' },
  { code: '+86', country: 'CN' },
  { code: '+91', country: 'IN' },
  { code: '+61', country: 'AU' },
  { code: '+64', country: 'NZ' },
];

interface ShippingForm {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  address2: string;
  city: string;
  postalCode: string;
  country: string;
  phonePrefix: string;
  phone: string;
}

type ShippingErrors = Partial<Record<keyof ShippingForm, boolean>>;

const NAME_RE = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜüÇç\s'-]+$/;
const ADDRESS_RE = /^[A-Za-z0-9\s]+$/;
const POSTAL_RE = /^[A-Za-z0-9\s-]{3,12}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d\s()-]{6,20}$/;

const REQUIRED_FIELDS: Array<keyof ShippingForm> = [
  'email', 'firstName', 'lastName', 'address', 'city', 'postalCode', 'country', 'phone',
];

const FIELD_VALIDATORS: Record<keyof ShippingForm, (v: string) => boolean> = {
  email: (v) => EMAIL_RE.test(v),
  firstName: (v) => NAME_RE.test(v),
  lastName: (v) => NAME_RE.test(v),
  address: (v) => ADDRESS_RE.test(v) && /\s/.test(v),
  address2: () => true,
  city: (v) => NAME_RE.test(v),
  postalCode: (v) => POSTAL_RE.test(v),
  country: (v) => NAME_RE.test(v),
  phone: (v) => PHONE_RE.test(v),
  phonePrefix: () => true,
};

const FIELD_RULES: Record<keyof ShippingForm, { maxLength: number; sanitize: (v: string) => string }> = {
  email: {
    maxLength: 100,
    sanitize: (v) => v.toLowerCase().replace(/\s/g, ''),
  },
  firstName: {
    maxLength: 50,
    sanitize: (v) => v.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñÜüÇç\s'-]/g, ''),
  },
  lastName: {
    maxLength: 50,
    sanitize: (v) => v.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñÜüÇç\s'-]/g, ''),
  },
  address: {
    maxLength: 35,
    sanitize: (v) => v.replace(/[^A-Za-z0-9\s]/g, ''),
  },
  address2: {
    maxLength: 40,
    sanitize: (v) => v.replace(/[^A-Za-z0-9.,#\-/\s]/g, ''),
  },
  city: {
    maxLength: 60,
    sanitize: (v) => v.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñÜüÇç\s'-]/g, ''),
  },
  postalCode: {
    maxLength: 12,
    sanitize: (v) => v.replace(/[^A-Za-z0-9\s-]/g, '').toUpperCase(),
  },
  country: {
    maxLength: 60,
    sanitize: (v) => v.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñÜüÇç\s'-]/g, ''),
  },
  phone: {
    maxLength: 20,
    sanitize: (v) => v.replace(/[^\d\s()\-]/g, ''),
  },
  phonePrefix: {
    maxLength: 5,
    sanitize: (v) => v,
  },
};

export function CartPage() {
  const t = useTranslations('cart');
  const locale = useLocale();
  const { items, updateQuantity, removeItem, totalItems, jerseysSubtotal, dorsalTotal, discount, shippingCost, finalPrice } = useCart();
  const { consent } = useConsent();
  const [form, setForm] = useState<ShippingForm>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    address2: '',
    city: '',
    postalCode: '',
    country: '',
    phonePrefix: '+34',
    phone: '',
  });
  const [errors, setErrors] = useState<ShippingErrors>({});

  const getKey = (item: (typeof items)[0]) =>
    cartItemKey(item.jersey.id, {
      size: item.size,
      dorsalName: item.dorsalName,
      dorsalNumber: item.dorsalNumber,
    });

  const updateField = (field: keyof ShippingForm, value: string) => {
    const rule = FIELD_RULES[field];
    const sanitized = rule.sanitize(value).slice(0, rule.maxLength);
    setForm((prev) => ({ ...prev, [field]: sanitized }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: false }));
  };

  const validateField = (field: keyof ShippingForm) => {
    const value = (form[field] ?? '').trim();
    const isRequired = REQUIRED_FIELDS.includes(field);
    const isInvalid = (isRequired && !value) || (value !== '' && !FIELD_VALIDATORS[field](value));
    setErrors((prev) => ({ ...prev, [field]: isInvalid }));
  };

  const validateForm = (): boolean => {
    const newErrors: ShippingErrors = {};
    for (const field of REQUIRED_FIELDS) {
      const value = (form[field] ?? '').trim();
      if (!value || !FIELD_VALIDATORS[field](value)) newErrors[field] = true;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = async () => {
    if (!validateForm()) return;

    // Fire client-side InitiateCheckout and capture attribution + eventId.
    // The same eventId is sent to Stripe metadata so the server-side Purchase
    // event from the webhook can dedupe with the client-side Pixel event.
    const { eventId, attribution } = await trackInitiateCheckout(finalPrice, 'EUR');

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.flatMap((item) => {
            const { jersey, quantity, size, dorsalName, dorsalNumber } = item;
            const parts = [`${jersey.team}`, `(${size})`];
            if (dorsalName || dorsalNumber) {
              parts.push(`#${dorsalNumber || ''} ${dorsalName || ''}`.trim());
            }
            const lineItems: Array<{ name: string; price: number; quantity: number; image?: string; isCustomization?: boolean }> = [
              { name: parts.join(' '), price: jersey.price, quantity, image: jersey.image },
            ];
            const dorsal = dorsalExtraCost(item);
            if (dorsal > 0) {
              lineItems.push({
                name: `${t('dorsalExtra')} - ${jersey.team} (${size})`,
                price: dorsal,
                quantity,
                isCustomization: true,
              });
            }
            return lineItems;
          }),
          locale,
          email: form.email.trim(),
          shipping: {
            firstName: form.firstName.trim(),
            lastName: form.lastName.trim(),
            address: form.address.trim(),
            address2: form.address2.trim(),
            city: form.city.trim(),
            postalCode: form.postalCode.trim(),
            country: form.country.trim(),
            phone: `${form.phonePrefix} ${form.phone.trim()}`,
          },
          eventId,
          attribution,
          marketingConsent: consent.marketing,
        }),
      });
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch {
      // Stripe redirect handles errors
    }
  };

  if (items.length === 0) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center bg-black">
        <div className="text-center px-4">
          <ShoppingBag className="h-16 w-16 text-zinc-700 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-white mb-2">{t('empty')}</h1>
          <p className="text-zinc-500 mb-8">{t('emptyDescription')}</p>
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black font-bold rounded-full hover:brightness-110 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('browseCatalog')}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-20 bg-black min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
          {t('title')}
        </h1>
        <p className="text-zinc-500 mb-10">
          {t('itemCount', { count: totalItems })}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const { jersey, quantity, size, dorsalName, dorsalNumber } = item;
              const key = getKey(item);

              return (
                <div
                  key={key}
                  className="flex gap-4 p-4 rounded-lg bg-zinc-900/80 border border-zinc-800/50"
                >
                  {/* Jersey thumbnail */}
                  <div className="w-20 h-24 md:w-24 md:h-28 flex-shrink-0 bg-zinc-800 rounded-md overflow-hidden relative">
                    <Image
                      src={jersey.image}
                      alt={jersey.team}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                    {/* Size badge on thumbnail */}
                    <span className="absolute bottom-1 right-1 px-1.5 py-0.5 text-[9px] font-bold bg-primary text-black rounded z-10">
                      {size}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white text-sm md:text-base truncate">
                      {jersey.team}
                    </h3>

                    {/* Size & dorsal details */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="inline-flex items-center px-3 py-1 text-xs font-bold bg-zinc-800 text-zinc-200 rounded-md">
                        {t('size')}: {size}
                      </span>
                      {(dorsalName || dorsalNumber) && (
                        <span className="inline-flex items-center px-3 py-1 text-xs font-bold bg-zinc-800 text-zinc-200 rounded-md">
                          {t('dorsal')}: {dorsalNumber && `#${dorsalNumber}`}{' '}
                          {dorsalName}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity controls */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateQuantity(key, quantity - 1)}
                          className={cn(
                            'p-1.5 rounded-md border transition-colors',
                            quantity <= 1
                              ? 'border-zinc-800 text-zinc-600'
                              : 'border-zinc-700 text-zinc-300 hover:border-primary hover:text-primary'
                          )}
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-10 text-center text-sm font-bold text-white">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(key, quantity + 1)}
                          className="p-1.5 rounded-md border border-zinc-700 text-zinc-300 hover:border-primary hover:text-primary transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span className="text-white font-bold text-sm md:text-base">
                          €{(jersey.price * quantity).toFixed(2)}
                        </span>
                        {quantity > 1 && (
                          <p className="text-[11px] text-zinc-500">
                            €{jersey.price.toFixed(2)} / u.
                          </p>
                        )}
                        {dorsalExtraCost(item) > 0 && (
                          <p className="text-[11px] text-primary">
                            +€{(dorsalExtraCost(item) * quantity).toFixed(2)} {t('dorsalExtra').toLowerCase()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(key)}
                    className="self-start p-2 text-zinc-600 hover:text-red-500 transition-colors"
                    aria-label={t('remove')}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-6 rounded-lg bg-zinc-900/80 border border-zinc-800/50">
              <h2 className="text-lg font-bold text-white mb-6">{t('subtotal')}</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">{t('jerseysSubtotal')}</span>
                  <span className="text-white font-medium">€{jerseysSubtotal.toFixed(2)}</span>
                </div>
                {dorsalTotal > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">{t('dorsalExtra')}</span>
                    <span className="text-white font-medium">€{dorsalTotal.toFixed(2)}</span>
                  </div>
                )}
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-emerald-400">{t('promoDiscount')}</span>
                    <span className="text-emerald-400 font-medium">-€{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">{t('shipping')}</span>
                  <span className={cn('font-medium', shippingCost === 0 ? 'text-emerald-400' : 'text-white')}>
                    {shippingCost === 0 ? t('shippingFree') : `€${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="border-t border-zinc-800 pt-3 flex justify-between">
                  <span className="text-white font-bold">{t('total')}</span>
                  <span className="text-white font-black text-xl">
                    €{finalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Shipping details */}
              <div className="mb-6 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  {t('shippingTitle')}
                </h3>

                {/* Email */}
                <div>
                  <label htmlFor="checkout-email" className="block text-xs font-semibold text-zinc-300 mb-1">
                    <Mail className="inline h-3.5 w-3.5 mr-1 text-primary" />
                    {t('emailLabel')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="checkout-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    onBlur={() => validateField('email')}
                    placeholder={t('emailPlaceholder')}
                    aria-required="true"
                    aria-invalid={errors.email}
                    aria-describedby="email-help email-error"
                    maxLength={100}
                    autoComplete="email"
                    inputMode="email"
                    className={cn(
                      'w-full px-3 py-2 text-base sm:text-sm bg-zinc-800 border rounded-lg text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary transition-colors',
                      errors.email ? 'border-red-500' : 'border-zinc-700'
                    )}
                  />
                  {errors.email && (
                    <p id="email-error" role="alert" className="text-xs text-red-500 mt-1">
                      {t('emailRequired')}
                    </p>
                  )}
                  <p id="email-help" className="text-[11px] text-primary/80 mt-1">
                    {t('emailHelp')}
                  </p>
                </div>

                {/* First Name & Last Name */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="checkout-firstName" className="block text-xs font-semibold text-zinc-300 mb-1">
                      {t('firstNameLabel')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="checkout-firstName"
                      type="text"
                      value={form.firstName}
                      onChange={(e) => updateField('firstName', e.target.value)}
                      onBlur={() => validateField('firstName')}
                      placeholder={t('firstNamePlaceholder')}
                      aria-required="true"
                      aria-invalid={errors.firstName}
                      maxLength={50}
                      autoComplete="given-name"
                      className={cn(
                        'w-full px-3 py-2 text-base sm:text-sm bg-zinc-800 border rounded-lg text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary transition-colors',
                        errors.firstName ? 'border-red-500' : 'border-zinc-700'
                      )}
                    />
                    {errors.firstName && (
                      <p role="alert" className="text-xs text-red-500 mt-1">{t('nameInvalid')}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="checkout-lastName" className="block text-xs font-semibold text-zinc-300 mb-1">
                      {t('lastNameLabel')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="checkout-lastName"
                      type="text"
                      value={form.lastName}
                      onChange={(e) => updateField('lastName', e.target.value)}
                      onBlur={() => validateField('lastName')}
                      placeholder={t('lastNamePlaceholder')}
                      aria-required="true"
                      aria-invalid={errors.lastName}
                      maxLength={50}
                      autoComplete="family-name"
                      className={cn(
                        'w-full px-3 py-2 text-base sm:text-sm bg-zinc-800 border rounded-lg text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary transition-colors',
                        errors.lastName ? 'border-red-500' : 'border-zinc-700'
                      )}
                    />
                    {errors.lastName && (
                      <p role="alert" className="text-xs text-red-500 mt-1">{t('nameInvalid')}</p>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label htmlFor="checkout-address" className="block text-xs font-semibold text-zinc-300 mb-1">
                    {t('addressLabel')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="checkout-address"
                    type="text"
                    value={form.address}
                    onChange={(e) => updateField('address', e.target.value)}
                    onBlur={() => validateField('address')}
                    placeholder={t('addressPlaceholder')}
                    aria-required="true"
                    aria-invalid={errors.address}
                    maxLength={35}
                    autoComplete="address-line1"
                    className={cn(
                      'w-full px-3 py-2 text-base sm:text-sm bg-zinc-800 border rounded-lg text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary transition-colors',
                      errors.address ? 'border-red-500' : 'border-zinc-700'
                    )}
                  />
                  {errors.address && (
                    <p role="alert" className="text-xs text-red-500 mt-1">{t('addressInvalid')}</p>
                  )}
                  <input
                    id="checkout-address2"
                    type="text"
                    value={form.address2}
                    onChange={(e) => updateField('address2', e.target.value)}
                    placeholder={t('address2Placeholder')}
                    aria-label={t('address2Label')}
                    maxLength={40}
                    autoComplete="address-line2"
                    className="w-full mt-2 px-3 py-2 text-base sm:text-sm bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                {/* City & Postal Code */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="checkout-city" className="block text-xs font-semibold text-zinc-300 mb-1">
                      {t('cityLabel')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="checkout-city"
                      type="text"
                      value={form.city}
                      onChange={(e) => updateField('city', e.target.value)}
                      onBlur={() => validateField('city')}
                      placeholder={t('cityPlaceholder')}
                      aria-required="true"
                      aria-invalid={errors.city}
                      maxLength={60}
                      autoComplete="address-level2"
                      className={cn(
                        'w-full px-3 py-2 text-base sm:text-sm bg-zinc-800 border rounded-lg text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary transition-colors',
                        errors.city ? 'border-red-500' : 'border-zinc-700'
                      )}
                    />
                    {errors.city && (
                      <p role="alert" className="text-xs text-red-500 mt-1">{t('cityInvalid')}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="checkout-postalCode" className="block text-xs font-semibold text-zinc-300 mb-1">
                      {t('postalCodeLabel')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="checkout-postalCode"
                      type="text"
                      value={form.postalCode}
                      onChange={(e) => updateField('postalCode', e.target.value)}
                      onBlur={() => validateField('postalCode')}
                      placeholder={t('postalCodePlaceholder')}
                      aria-required="true"
                      aria-invalid={errors.postalCode}
                      maxLength={12}
                      autoComplete="postal-code"
                      className={cn(
                        'w-full px-3 py-2 text-base sm:text-sm bg-zinc-800 border rounded-lg text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary transition-colors',
                        errors.postalCode ? 'border-red-500' : 'border-zinc-700'
                      )}
                    />
                    {errors.postalCode && (
                      <p role="alert" className="text-xs text-red-500 mt-1">{t('postalCodeInvalid')}</p>
                    )}
                  </div>
                </div>

                {/* Country */}
                <div>
                  <label htmlFor="checkout-country" className="block text-xs font-semibold text-zinc-300 mb-1">
                    <Globe className="inline h-3.5 w-3.5 mr-1 text-primary" />
                    {t('countryLabel')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="checkout-country"
                    type="text"
                    value={form.country}
                    onChange={(e) => updateField('country', e.target.value)}
                    onBlur={() => validateField('country')}
                    placeholder={t('countryPlaceholder')}
                    aria-required="true"
                    aria-invalid={errors.country}
                    maxLength={60}
                    autoComplete="country-name"
                    className={cn(
                      'w-full px-3 py-2 text-base sm:text-sm bg-zinc-800 border rounded-lg text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary transition-colors',
                      errors.country ? 'border-red-500' : 'border-zinc-700'
                    )}
                  />
                  {errors.country && (
                    <p role="alert" className="text-xs text-red-500 mt-1">{t('countryInvalid')}</p>
                  )}
                </div>

                {/* Phone with prefix */}
                <div>
                  <label htmlFor="checkout-phone" className="block text-xs font-semibold text-zinc-300 mb-1">
                    <Phone className="inline h-3.5 w-3.5 mr-1 text-primary" />
                    {t('phoneLabel')} <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <select
                      id="checkout-phonePrefix"
                      value={form.phonePrefix}
                      onChange={(e) => updateField('phonePrefix', e.target.value)}
                      aria-label={t('phonePrefix')}
                      className="w-[110px] flex-shrink-0 px-2 py-2 text-base sm:text-sm bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                    >
                      {PHONE_PREFIXES.map(({ code, country }) => (
                        <option key={code} value={code}>
                          {code} {country}
                        </option>
                      ))}
                    </select>
                    <input
                      id="checkout-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      onBlur={() => validateField('phone')}
                      placeholder={t('phonePlaceholder')}
                      aria-required="true"
                      aria-invalid={errors.phone}
                      aria-describedby="phone-error"
                      maxLength={20}
                      autoComplete="tel-national"
                      inputMode="tel"
                      className={cn(
                        'flex-1 px-3 py-2 text-base sm:text-sm bg-zinc-800 border rounded-lg text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary transition-colors',
                        errors.phone ? 'border-red-500' : 'border-zinc-700'
                      )}
                    />
                  </div>
                  {errors.phone && (
                    <p id="phone-error" role="alert" className="text-xs text-red-500 mt-1">
                      {t('phoneInvalid')}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <div
                  className="flex items-start gap-3 p-3 rounded-lg bg-zinc-800/60 border border-zinc-700"
                  role="note"
                  aria-label={t('deliveryEstimate')}
                >
                  <Truck className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <p className="text-sm font-semibold text-white leading-tight">
                      {t('deliveryEstimate')}
                    </p>
                    <p className="text-xs text-zinc-400 leading-snug">
                      {t('deliveryTracking')}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 bg-primary text-black font-bold rounded-full hover:brightness-110 transition-all text-sm"
                >
                  {t('checkout')}
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}




export const LOCALES = {
  US: "en-US",
  UK: "en-GB",
  CA: "en-CA",
};


export const CURRENCIES = {
  CAD: "CAD",
  USD: "USD",
  EUR: "EUR",
  GBP: "GBP",
};


export const CURRENCY_FORMAT_OPTIONS = {
  STYLE: "currency",
  CURRENCY: CURRENCIES.CAD,
} as const;


export const DATE_FORMAT_OPTIONS = {
  YEAR: "numeric",
  MONTH: "short",
  DAY: "numeric",
} as const;


export const NUMBER_FORMAT = {
  LOCALE: LOCALES.US,
  CURRENCY: CURRENCIES.CAD,
};


export const FIELD_TYPES = {
  TEXT: 'text',
  CURRENCY: 'currency',
  PERCENTAGE: 'percentage',
};


export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat(NUMBER_FORMAT.LOCALE, {
    style: CURRENCY_FORMAT_OPTIONS.STYLE,
    currency: NUMBER_FORMAT.CURRENCY,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString(LOCALES.US, DATE_FORMAT_OPTIONS as Intl.DateTimeFormatOptions);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat(NUMBER_FORMAT.LOCALE).format(num);
};

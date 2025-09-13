

export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  INVOICES: `${BASE_URL}/api/invoices/`,
  BUSINESS_OWNERS: `${BASE_URL}/api/business-owners/`,
  CUSTOMERS: `${BASE_URL}/api/customers/`,
  USERS: `${BASE_URL}/api/users/`,
  HEALTH: `${BASE_URL}/api/health/`,
  PAYMENT_HISTORY: `${BASE_URL}/api/transactions/`,
  WEBHOOKS: `${BASE_URL}/api/webhooks/`,
};

export const CACHE_TIMES = {
  STALE_TIME: 5 * 60 * 1000,
  CACHE_TIME: 10 * 60 * 1000,
};

export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
  OPTIONS: 'OPTIONS',
};

export const HTTP_HEADERS = {
  CONTENT_TYPE: 'Content-Type'
};

export const CONTENT_TYPES = {
  JSON: 'application/json',
};

export const ROUTES = {
  HOME: '/',
  INVOICES: '/invoices',
  BUSINESS_OWNERS: '/business-owners',
  CUSTOMERS: '/customers',
};

export const NAVIGATION_ITEMS = [
  {
    route: ROUTES.INVOICES,
    label: 'Invoices',
  },
  {
    route: ROUTES.BUSINESS_OWNERS,
    label: 'Business Owners',
  },
  {
    route: ROUTES.CUSTOMERS,
    label: 'Customers',
  },
];


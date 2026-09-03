// src/services/api.js
// AgriMart Unified API Client for Django Core (Port 8000) & FastAPI Realtime (Port 8001)

const DJANGO_BASE_URL = import.meta.env.VITE_DJANGO_URL || 'http://127.0.0.1:8000';
const FASTAPI_BASE_URL = import.meta.env.VITE_FASTAPI_URL || 'http://127.0.0.1:8001';

/**
 * Helper to execute fetch with JSON headers and authorization if present
 */
async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('agrimart_access_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${DJANGO_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMsg = errorData.error || errorData.detail || `Request failed with status ${response.status}`;
    throw new Error(errorMsg);
  }

  return response.json();
}

/**
 * Unified Authentication: Authenticates farmer, merchant, or admin
 */
export async function apiLogin(identifier, password, role) {
  const data = await apiRequest('/api/v1/auth/login/', {
    method: 'POST',
    body: JSON.stringify({ identifier, password, role }),
  });

  if (data.tokens?.access) {
    localStorage.setItem('agrimart_access_token', data.tokens.access);
    localStorage.setItem('agrimart_refresh_token', data.tokens.refresh);
    localStorage.setItem('agrimart_user', JSON.stringify(data.user));
  }
  return data;
}

/**
 * Fetch Current Authenticated User
 */
export async function apiGetCurrentUser() {
  return apiRequest('/api/v1/auth/me/');
}

/**
 * Fetch Product Categories
 */
export async function apiGetCategories() {
  return apiRequest('/api/v1/store/categories/');
}

/**
 * Fetch Store Products with optional category and search query
 */
export async function apiGetProducts(category, search, sort) {
  const params = new URLSearchParams();
  if (category && category !== 'all') params.append('category', category);
  if (search) params.append('q', search);
  if (sort) params.append('sort', sort);

  const query = params.toString() ? `?${params.toString()}` : '';
  return apiRequest(`/api/v1/store/products/${query}`);
}

/**
 * Fetch Rental Machinery Fleet
 */
export async function apiGetRentalEquipment() {
  return apiRequest('/api/v1/rentals/equipment/');
}

/**
 * Book Rental Equipment (ACID Transaction with Pessimistic Row Lock)
 */
export async function apiBookEquipment(bookingPayload) {
  return apiRequest('/api/v1/rentals/book/', {
    method: 'POST',
    body: JSON.stringify(bookingPayload),
  });
}

/**
 * Fetch Live Mandi Daily Tickers
 */
export async function apiGetMandiTickers() {
  return apiRequest('/api/v1/mandi/tickers/');
}

/**
 * Fetch Active Mandi Auction Lots
 */
export async function apiGetAuctionLots() {
  return apiRequest('/api/v1/mandi/lots/');
}

/**
 * Place a Bid on an Auction Lot
 */
export async function apiPlaceBid(lotId, bidAmountPerQtl, idempotencyKey) {
  return apiRequest(`/api/v1/mandi/lots/${lotId}/bid/`, {
    method: 'POST',
    body: JSON.stringify({
      bid_amount_per_qtl: bidAmountPerQtl,
      idempotency_key: idempotencyKey || crypto.randomUUID(),
    }),
  });
}

export { DJANGO_BASE_URL, FASTAPI_BASE_URL };

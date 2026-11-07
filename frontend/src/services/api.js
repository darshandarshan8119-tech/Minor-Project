// src/services/api.js
// AgriMart Unified API Client for Django Core (Port 8000) & FastAPI Realtime (Port 8001)

const DJANGO_BASE_URL = import.meta.env.VITE_DJANGO_URL || 'http://127.0.0.1:8002';
const FASTAPI_BASE_URL = import.meta.env.VITE_FASTAPI_URL || 'http://127.0.0.1:8001';

async function refreshAccessToken() {
  const refresh = localStorage.getItem('agrimart_refresh_token');
  if (!refresh) return null;

  try {
    const response = await fetch(`${DJANGO_BASE_URL}/api/v1/auth/token/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh }),
    });
    if (!response.ok) return null;

    const tokens = await response.json();
    if (!tokens.access) return null;
    localStorage.setItem('agrimart_access_token', tokens.access);
    if (tokens.refresh) localStorage.setItem('agrimart_refresh_token', tokens.refresh);
    return tokens.access;
  } catch {
    return null;
  }
}

async function fetchWithAuthRecovery(endpoint, options, isUpload = false) {
  const request = (token) => {
    const headers = {
      ...(!isUpload ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };
    return fetch(`${DJANGO_BASE_URL}${endpoint}`, { ...options, headers });
  };

  const originalToken = localStorage.getItem('agrimart_access_token');
  const response = await request(originalToken);
  if (response.status !== 401 || !originalToken) return response;

  const refreshedToken = await refreshAccessToken();
  if (refreshedToken) return request(refreshedToken);

  localStorage.removeItem('agrimart_access_token');
  localStorage.removeItem('agrimart_refresh_token');
  localStorage.removeItem('agrimart_user');
  return request(null);
}

/**
 * Helper to execute fetch with JSON headers and authorization if present
 */
async function apiRequest(endpoint, options = {}) {
  const response = await fetchWithAuthRecovery(endpoint, options);

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

/**
 * Fetch Commodities Master List
 */
export async function apiGetCommodities() {
  return apiRequest('/api/v1/mandi/commodities/');
}

/**
 * Fetch Mandi APMC Master List
 */
export async function apiGetAPMCs() {
  return apiRequest('/api/v1/mandi/apmcs/');
}

/**
 * Assistant Market Chat Query
 */
export async function apiAssistantChat(message, conversationId, explanationLevel = 'simple', language = 'en') {
  return apiRequest('/api/v1/assistant/chat/', {
    method: 'POST',
    body: JSON.stringify({
      message,
      ...(conversationId ? { conversation_id: conversationId } : {}),
      explanation_level: explanationLevel,
      language,
    }),
  });
}

/**
 * Get Verified Electronic Contract Notes & Escrow Transactions
 */
export async function apiGetTransactions() {
  return apiRequest('/api/v1/transactions/');
}

/**
 * Get APMC Delivery Gate Slot Bookings
 */
export async function apiGetMyBookings() {
  return apiRequest('/api/v1/bookings/my-bookings/');
}

/**
 * Create a Delivery Slot Booking
 */
export async function apiCreateSlotBooking(slotId, commodityCode, quantityQuintals, vehicleNumber, driverPhone) {
  return apiRequest('/api/v1/bookings/create/', {
    method: 'POST',
    body: JSON.stringify({
      slot_id: slotId,
      commodity_code: commodityCode,
      quantity_quintals: quantityQuintals,
      vehicle_number: vehicleNumber,
      driver_phone: driverPhone || '',
    }),
  });
}

/**
 * Helper to execute multipart/form-data upload with authorization
 */
async function apiUploadRequest(endpoint, formData) {
  const response = await fetchWithAuthRecovery(endpoint, {
    method: 'POST',
    body: formData,
  }, true);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMsg = errorData.error || errorData.detail || errorData.message || `Upload failed with status ${response.status}`;
    throw new Error(errorMsg);
  }

  return response.json();
}

/**
 * AI Crop Intelligence: Disease Detection (Photo Upload)
 */
export async function apiDetectDisease(imageFile, cropHint = '') {
  const formData = new FormData();
  formData.append('image', imageFile);
  if (cropHint) formData.append('crop_hint', cropHint);
  return apiUploadRequest('/api/v1/crop-intelligence/disease-scan/', formData);
}

/**
 * AI Crop Intelligence: Clinical Symptom Fallback Lookup
 */
export async function apiSymptomLookup(crop, symptoms) {
  return apiRequest('/api/v1/crop-intelligence/symptom-lookup/', {
    method: 'POST',
    body: JSON.stringify({ crop, symptoms }),
  });
}

/**
 * AI Crop Intelligence: Soil Chemistry Crop Recommendation
 */
export async function apiCropRecommend(payload) {
  return apiRequest('/api/v1/crop-intelligence/recommend/', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * AI Crop Intelligence: Soil Health Card Upload & Parse
 */
export async function apiParseSoilReport(file) {
  const formData = new FormData();
  formData.append('file', file);
  return apiUploadRequest('/api/v1/crop-intelligence/soil-report/', formData);
}

/**
 * AI Crop Intelligence: Confirm Soil Report Extracted Parameters
 */
export async function apiConfirmSoilReport(reportId, verifiedParameters) {
  return apiRequest('/api/v1/crop-intelligence/soil-report/confirm/', {
    method: 'POST',
    body: JSON.stringify({
      report_id: reportId,
      verified_parameters: verifiedParameters,
    }),
  });
}

/**
 * AI Crop Intelligence: User History of Scans, Soil Cards, and Recommendations
 */
export async function apiGetCropHistory() {
  return apiRequest('/api/v1/crop-intelligence/history/');
}

/**
 * Clear Local Session on Logout
 */
export function apiLogout() {
  localStorage.removeItem('agrimart_access_token');
  localStorage.removeItem('agrimart_refresh_token');
  localStorage.removeItem('agrimart_user');
  localStorage.removeItem('agrimart_user_session');
}

export { DJANGO_BASE_URL, FASTAPI_BASE_URL };

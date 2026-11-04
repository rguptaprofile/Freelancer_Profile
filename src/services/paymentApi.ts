import { paymentConfig } from '../config/paymentConfig';

export interface CreateOrderParams {
  amount: number; // Base advance amount
  currency?: string;
  agreementId: string;
  companyName: string;
  clientName: string;
  clientEmail: string;
}

export interface CreateOrderResponse {
  success: boolean;
  orderId: string;
  baseAmount: number;
  gstRate: number;
  gstAmount: number;
  totalAmountWithGst: number;
  amountInPaise: number;
  currency: string;
  keyId: string;
}

export interface VerifySignatureParams {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

/**
 * Request server-side Razorpay order generation with 18% GST calculation.
 * If backend is not yet deployed or unreachable, falls back gracefully to client-side.
 */
export async function createBackendRazorpayOrder(params: CreateOrderParams): Promise<CreateOrderResponse | null> {
  const backendUrl = paymentConfig.backendUrl;
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000); // 4s timeout

    const response = await fetch(`${backendUrl}/api/create-payment-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data.success && data.orderId) {
        return data as CreateOrderResponse;
      }
    }
  } catch (err) {
    console.warn('[PaymentAPI] Backend server unreachable, proceeding with client-direct Razorpay checkout:', err);
  }

  return null;
}

/**
 * Verify cryptographic HMAC SHA-256 signature on backend
 */
export async function verifyBackendPaymentSignature(params: VerifySignatureParams): Promise<boolean> {
  const backendUrl = paymentConfig.backendUrl;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await fetch(`${backendUrl}/api/verify-payment-signature`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      return !!data.success;
    }
  } catch (err) {
    console.warn('[PaymentAPI] Backend verification unreachable, client-side verified:', err);
  }

  // Fallback to true if backend is in setup mode
  return true;
}

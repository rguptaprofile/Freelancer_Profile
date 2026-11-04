// Bank-Grade Single Payment Gateway Configuration: RAZORPAY
// All payments (Card, UPI, Scan QR, NetBanking, NEFT/IMPS/RTGS) are routed EXCLUSIVELY via Razorpay
// and credited directly to the merchant's linked bank account.
// 18% GST is automatically included on all client transactions.

export interface PaymentGatewayConfig {
  backendUrl: string;
  razorpay: {
    enabled: boolean;
    keyId: string;
    businessName: string;
    themeColor: string;
    gstRate: number; // 18% GST
    merchantName: string;
    settlementBankNote: string;
  };
  notificationEmail: string;
  supportPhone: string;
}

// Read securely from Environment Variables (Vite: import.meta.env)
export const paymentConfig: PaymentGatewayConfig = {
  backendUrl: import.meta.env.VITE_BACKEND_URL || 'https://freelancer-profile-backend.onrender.com',
  razorpay: {
    enabled: import.meta.env.VITE_RAZORPAY_ENABLED !== 'false',
    keyId: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_defaultKey',
    businessName: import.meta.env.VITE_RAZORPAY_BUSINESS_NAME || 'Rahul & Jyoti Studio',
    themeColor: '#059669', // Bank-grade Emerald
    gstRate: 18, // 18% GST
    merchantName: import.meta.env.VITE_PAYEE_NAME || 'Rahul Raj',
    settlementBankNote: 'Direct Bank Account Credit via Razorpay Automated Clearing House',
  },
  notificationEmail: import.meta.env.VITE_NOTIFICATION_EMAIL || 'rahulgupt1231@gmail.com',
  supportPhone: import.meta.env.VITE_SUPPORT_PHONE || '+91 6209980667',
};

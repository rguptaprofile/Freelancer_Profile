/// <reference types="vite/client" />
/// <reference path="./types/lucide-react.d.ts" />
/// <reference path="./types/payment.d.ts" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_URL?: string;
  readonly VITE_PAYEE_UPI_ID?: string;
  readonly VITE_PAYEE_NAME?: string;
  readonly VITE_UPI_NOTE_PREFIX?: string;
  readonly VITE_RAZORPAY_ENABLED?: string;
  readonly VITE_RAZORPAY_KEY_ID?: string;
  readonly VITE_RAZORPAY_BUSINESS_NAME?: string;
  readonly VITE_GST_RATE?: string;
  readonly VITE_PAYEE_NAME?: string;
  readonly VITE_NOTIFICATION_EMAIL?: string;
  readonly VITE_SUPPORT_PHONE?: string;
  [key: string]: string | boolean | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

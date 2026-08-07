// Akri Bakes UPI Payment Configuration

export const UPI_CONFIG = {
  UPI_ID: "athukridebberma@okhdfcbank",
  BUSINESS_NAME: "Akri Bakes",
  MERCHANT_CODE: "",
};

export const UPI_APPS = [
  {
    id: "gpay",
    label: "Google Pay",
    color: "#4285F4",
    icon: (
      <svg viewBox="0 0 48 48" className="h-8 w-8">
        <rect width="48" height="48" rx="10" fill="#4285F4"/>
        <text x="24" y="32" textAnchor="middle" fill="white" fontSize="20" fontWeight="700" fontFamily="Product Sans, Arial, sans-serif">G</text>
      </svg>
    ),
    package: "com.google.android.apps.nbu.paisa.user",
    uriScheme: "tez",
  },
  {
    id: "paytm",
    label: "Paytm",
    color: "#00BAF2",
    icon: (
      <svg viewBox="0 0 100 48" className="h-8 w-auto">
        <rect width="100" height="48" rx="10" fill="#00BAF2"/>
        <text x="50" y="32" textAnchor="middle" fill="white" fontSize="20" fontWeight="700" fontFamily="Arial, sans-serif">Paytm</text>
      </svg>
    ),
    package: "net.one97.paytm",
    uriScheme: "paytmmp",
  },
  {
    id: "phonepe",
    label: "PhonePe",
    color: "#5F259F",
    icon: (
      <svg viewBox="0 0 48 48" className="h-8 w-8">
        <circle cx="24" cy="24" r="22" fill="#5F259F"/>
        <rect x="18" y="10" width="12" height="28" rx="6" fill="white"/>
        <circle cx="24" cy="17" r="4" fill="#5F259F"/>
      </svg>
    ),
    package: "com.phonepe.app",
    uriScheme: "phonepe",
  },
];

export function generateUPILink(amount, orderRef, appId) {
  const { UPI_ID, BUSINESS_NAME } = UPI_CONFIG;
  const params = new URLSearchParams({
    pa: UPI_ID,
    pn: BUSINESS_NAME,
    am: amount.toString(),
    cu: "INR",
    tn: `Order ${orderRef}`,
  });

  const app = UPI_APPS.find((a) => a.id === appId);
  if (app && app.uriScheme) {
    return `${app.uriScheme}://upi/pay?${params.toString()}`;
  }
  return `upi://pay?${params.toString()}`;
}

export async function copyUPIId() {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(UPI_CONFIG.UPI_ID);
    return;
  }
  throw new Error("Clipboard not available");
}

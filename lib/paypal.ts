const PAYPAL_API_BASE =
  process.env.PAYPAL_API_BASE_URL ??
  (process.env.PAYPAL_ENV === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com");

export async function getPayPalAccessToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("PayPal API credentials are not configured");
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`PayPal token failed: ${response.status} ${text}`);
  }

  const data = await response.json();
  return data.access_token as string;
}

export async function createPayPalOrder(input: {
  amount: number;
  credits: number;
  packId: string;
  packName: string;
  userId: string;
}) {
  const accessToken = await getPayPalAccessToken();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://lumiveil.vercel.app";

  const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: input.packId,
          custom_id: `${input.userId}:${input.packId}`,
          description: `LUMIVEIL ${input.packName}クレジット`,
          amount: {
            currency_code: "JPY",
            value: String(input.amount),
          },
          items: [
            {
              name: `LUMIVEIL ${input.packName}クレジット`,
              quantity: "1",
              unit_amount: {
                currency_code: "JPY",
                value: String(input.amount),
              },
              description: `${input.credits.toLocaleString("ja-JP")}クレジット`,
            },
          ],
        },
      ],
      application_context: {
        brand_name: "LUMIVEIL",
        shipping_preference: "NO_SHIPPING",
        user_action: "PAY_NOW",
        return_url: `${appUrl}/?paypal=success`,
        cancel_url: `${appUrl}/?paypal=canceled`,
      },
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`PayPal order create failed: ${response.status} ${text}`);
  }

  return response.json();
}

export async function capturePayPalOrder(orderId: string) {
  const accessToken = await getPayPalAccessToken();
  const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`PayPal order capture failed: ${response.status} ${text}`);
  }

  return response.json();
}

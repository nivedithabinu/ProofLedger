const PAYPAL_BASE_URL = process.env.PAYPAL_BASE_URL || "https://api-m.sandbox.paypal.com";

let cachedToken: string | null = null;
let tokenExpiresAt = 0;

async function getPayPalAccessToken(): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("PayPal credentials are not configured.");
  }

  if (cachedToken && Date.now() < tokenExpiresAt) {
    return cachedToken;
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const response = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
      method: "POST",

      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },

      body: "grant_type=client_credentials",
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(`PayPal authentication failed (${response.status}).`);
  }

  const data = await response.json();

  cachedToken = data.access_token;
  tokenExpiresAt = Date.now() + Math.max(0, data.expires_in - 60) * 1000;

  return cachedToken!;
}

export async function getPayPalDisputes() {
  const accessToken = await getPayPalAccessToken();

  const response = await fetch(
    `${PAYPAL_BASE_URL}/v1/customer/disputes`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`PayPal dispute retrieval failed (${response.status}).`);
  }

  return {
    items: Array.isArray(data.items) ? data.items : [],
    links: Array.isArray(data.links) ? data.links : [],
    total_items: data.total_items ?? data.items?.length ?? 0,
  };
}
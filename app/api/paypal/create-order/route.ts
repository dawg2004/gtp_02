import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { TOPUP_PACKS, type TopupPackId } from "@/lib/credit-packs";
import { createPayPalOrder } from "@/lib/paypal";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { packId } = await req.json();
    const pack = TOPUP_PACKS[packId as TopupPackId];
    if (!pack) {
      return NextResponse.json({ error: "無効なチャージパックです" }, { status: 400 });
    }

    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabase.auth.getUser(token!);
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const order = await createPayPalOrder({
      amount: pack.amount,
      credits: pack.credits,
      packId,
      packName: pack.name,
      userId: user.id,
    });

    const approveUrl = order.links?.find((link: { rel: string; href: string }) => link.rel === "approve")?.href;
    if (!approveUrl) {
      throw new Error("PayPal approve URL not found");
    }

    return NextResponse.json({ orderId: order.id, url: approveUrl });
  } catch (error) {
    const message = error instanceof Error ? error.message : "PayPal決済ページを作成できませんでした";
    console.error("paypal create order failed", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

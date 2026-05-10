import { NextRequest, NextResponse } from "next/server";
import { createClient, type SupabaseClient, type User } from "@supabase/supabase-js";
import { createServerSupabaseClient } from "@/lib/supabase-server";

const USER_HISTORY_LIMIT = 50;

function createBearerSupabaseClient(token: string) {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: { Authorization: `Bearer ${token}` },
      },
    }
  );
}

async function getAuthenticatedContext(req: NextRequest): Promise<{ user: User | null; client: SupabaseClient }> {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  if (token) {
    const tokenSupabase = createBearerSupabaseClient(token);
    const { data: { user } } = await tokenSupabase.auth.getUser(token);
    if (user) return { user, client: tokenSupabase };
  }

  const cookieSupabase = await createServerSupabaseClient();
  const { data: { user } } = await cookieSupabase.auth.getUser();
  return { user, client: cookieSupabase };
}

export async function GET(req: NextRequest) {
  try {
    const { user, client } = await getAuthenticatedContext(req);
    if (!user) {
      return NextResponse.json({ error: "ログイン状態が切れています。もう一度ログインしてください。" }, { status: 401 });
    }

    const { data: shop, error: shopError } = await client
      .from("shops")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();
    if (shopError) {
      throw new Error(shopError.message);
    }

    const shopIds = Array.from(new Set([user.id, shop?.id].filter(Boolean)));
    const { data, error } = await client
      .from("generation_history")
      .select("id, avatar_id, prompt, generated_image_url, credits_used, created_at")
      .in("shop_id", shopIds)
      .order("created_at", { ascending: false })
      .limit(USER_HISTORY_LIMIT);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ history: data ?? [], limit: USER_HISTORY_LIMIT });
  } catch (error) {
    const message = error instanceof Error ? error.message : "履歴を取得できませんでした";
    console.error("history fetch failed", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

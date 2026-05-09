import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createServerSupabaseClient } from "@/lib/supabase-server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const USER_HISTORY_LIMIT = 50;

async function getAuthenticatedUser(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  if (token) {
    const { data: { user } } = await supabase.auth.getUser(token);
    if (user) return user;
  }

  const cookieSupabase = await createServerSupabaseClient();
  const { data: { user } } = await cookieSupabase.auth.getUser();
  return user;
}

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return NextResponse.json({ error: "ログイン状態が切れています。もう一度ログインしてください。" }, { status: 401 });
    }

    const { data: shop } = await supabase
      .from("shops")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();

    const shopIds = Array.from(new Set([user.id, shop?.id].filter(Boolean)));
    const { data, error } = await supabase
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

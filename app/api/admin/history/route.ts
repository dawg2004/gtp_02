import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createServerSupabaseClient } from "@/lib/supabase-server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const ADMIN_HISTORY_LIMIT = 100;

function getAdminEmails() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map(email => email.trim().toLowerCase())
    .filter(Boolean);
}

export async function GET() {
  try {
    const cookieSupabase = await createServerSupabaseClient();
    const { data: { user } } = await cookieSupabase.auth.getUser();
    const email = user?.email?.toLowerCase();

    if (!email) {
      return NextResponse.json({ error: "ログインが必要です" }, { status: 401 });
    }

    if (!getAdminEmails().includes(email)) {
      return NextResponse.json({ error: "管理者権限が必要です" }, { status: 403 });
    }

    const { data, error } = await supabase
      .from("generation_history")
      .select("id, shop_id, avatar_id, prompt, generated_image_url, credits_used, created_at")
      .order("created_at", { ascending: false })
      .limit(ADMIN_HISTORY_LIMIT);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ history: data ?? [], limit: ADMIN_HISTORY_LIMIT });
  } catch (error) {
    const message = error instanceof Error ? error.message : "管理者履歴を取得できませんでした";
    console.error("admin history fetch failed", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

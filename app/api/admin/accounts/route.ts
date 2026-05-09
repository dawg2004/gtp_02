import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createServerSupabaseClient } from "@/lib/supabase-server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

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

    const [{ data: usersData, error: usersError }, { data: shops, error: shopsError }] = await Promise.all([
      supabase.auth.admin.listUsers({ page: 1, perPage: 1000 }),
      supabase
        .from("shops")
        .select("id, user_id, name, plan, credits, created_at")
        .order("created_at", { ascending: false }),
    ]);

    if (usersError) throw new Error(usersError.message);
    if (shopsError) throw new Error(shopsError.message);

    const shopByUserId = new Map((shops ?? []).map(shop => [shop.user_id, shop]));
    const accounts = (usersData.users ?? []).map(authUser => {
      const shop = shopByUserId.get(authUser.id);
      return {
        id: authUser.id,
        email: authUser.email ?? "",
        created_at: authUser.created_at,
        last_sign_in_at: authUser.last_sign_in_at ?? null,
        shop_id: shop?.id ?? null,
        shop_name: shop?.name ?? null,
        plan: shop?.plan ?? "free",
        credits: Number(shop?.credits ?? 0),
      };
    });

    return NextResponse.json({
      accounts,
      total: accounts.length,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "アカウント一覧を取得できませんでした";
    console.error("admin accounts fetch failed", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

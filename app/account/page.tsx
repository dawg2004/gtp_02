"use client";

import { createClient } from "@/lib/supabase";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AccountPage() {
  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        window.location.href = "/login";
        return;
      }

      setCurrentEmail(data.user.email ?? "");
      setNewEmail(data.user.email ?? "");
      setInitialLoading(false);
    };

    void loadUser();
  }, []);

  const updateAccount = async () => {
    setStatus("");

    const trimmedEmail = newEmail.trim();
    const updates: { email?: string; password?: string } = {};

    if (trimmedEmail && trimmedEmail !== currentEmail) {
      updates.email = trimmedEmail;
    }

    if (newPassword || confirmPassword) {
      if (newPassword.length < 6) {
        setStatus("パスワードは6文字以上で入力してください。");
        return;
      }

      if (newPassword !== confirmPassword) {
        setStatus("確認用パスワードが一致しません。");
        return;
      }

      updates.password = newPassword;
    }

    if (Object.keys(updates).length === 0) {
      setStatus("変更内容がありません。");
      return;
    }

    setLoading(true);
    setStatus("更新中...");

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.updateUser(updates);
      if (error) throw error;

      if (data.user?.email) {
        setCurrentEmail(data.user.email);
        setNewEmail(data.user.email);
      }

      setNewPassword("");
      setConfirmPassword("");
      setStatus(
        updates.email
          ? "更新しました。メールアドレス変更は確認メールのリンクを開くと完了します。"
          : "パスワードを更新しました。"
      );
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "更新に失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#071e28",
        color: "#f0ece4",
        fontFamily: "var(--font-lumiveil-sans)",
        padding: "24px",
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 28 }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "#f0ece4", textDecoration: "none" }}>
            <span style={{ width: 30, height: 30, background: "#c9a84c", borderRadius: 8, display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#071e28", fontWeight: 600 }}>
              L
            </span>
            <span style={{ fontSize: 15, letterSpacing: "0.08em", fontWeight: 500 }}>LUMIVEIL</span>
          </Link>
          <button
            onClick={() => void logout()}
            style={{
              padding: "8px 12px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.04)",
              color: "#b8c0c4",
              fontSize: 12,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            ログアウト
          </button>
        </header>

        <section
          style={{
            background: "#d8d1c4",
            border: "1px solid #a89e8e",
            borderRadius: 12,
            color: "#171717",
            padding: "28px",
          }}
        >
          <div style={{ fontSize: 12, color: "#6a6258", fontWeight: 500, marginBottom: 8 }}>ユーザー設定</div>
          <h1 style={{ fontSize: 28, lineHeight: 1.25, fontWeight: 500, margin: "0 0 8px" }}>アカウント</h1>
          <p style={{ fontSize: 13, color: "#4e4a43", lineHeight: 1.8, margin: "0 0 24px" }}>
            メールアドレスとパスワードを変更できます。メールアドレス変更は確認メールの承認後に反映されます。
          </p>

          {initialLoading ? (
            <div style={{ minHeight: 220, display: "flex", alignItems: "center", justifyContent: "center", color: "#5f5648", fontSize: 13 }}>
              読み込み中...
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 460 }}>
              <div>
                <div style={{ fontSize: 11, color: "#6a6258", fontWeight: 500, marginBottom: 7 }}>現在のメールアドレス</div>
                <div style={{ padding: "11px 12px", borderRadius: 8, background: "rgba(0,0,0,0.06)", border: "1px solid #a89e8e", fontSize: 13 }}>
                  {currentEmail || "--"}
                </div>
              </div>

              <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                <span style={{ fontSize: 11, color: "#6a6258", fontWeight: 500 }}>新しいメールアドレス</span>
                <input
                  type="email"
                  value={newEmail}
                  onChange={event => setNewEmail(event.target.value)}
                  style={inputStyle}
                />
              </label>

              <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                <span style={{ fontSize: 11, color: "#6a6258", fontWeight: 500 }}>新しいパスワード</span>
                <input
                  type="password"
                  value={newPassword}
                  onChange={event => setNewPassword(event.target.value)}
                  placeholder="変更する場合のみ入力"
                  style={inputStyle}
                />
              </label>

              <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                <span style={{ fontSize: 11, color: "#6a6258", fontWeight: 500 }}>新しいパスワード確認</span>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={event => setConfirmPassword(event.target.value)}
                  placeholder="もう一度入力"
                  style={inputStyle}
                />
              </label>

              {status ? (
                <div
                  style={{
                    padding: "10px 12px",
                    borderRadius: 8,
                    background: "rgba(0,0,0,0.06)",
                    color: status.includes("失敗") || status.includes("一致") || status.includes("6文字") ? "#b84242" : "#4a7c50",
                    fontSize: 12,
                    fontWeight: 500,
                    lineHeight: 1.6,
                  }}
                >
                  {status}
                </div>
              ) : null}

              <button
                onClick={() => void updateAccount()}
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "13px 16px",
                  borderRadius: 8,
                  border: "1px solid #c9a84c",
                  background: "#c9a84c",
                  color: "#0b222c",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.6 : 1,
                  fontFamily: "inherit",
                  marginTop: 4,
                }}
              >
                {loading ? "更新中..." : "変更を保存"}
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

const inputStyle = {
  width: "100%",
  padding: "11px 12px",
  borderRadius: 8,
  border: "1px solid #a89e8e",
  background: "rgba(0,0,0,0.06)",
  color: "#111",
  fontSize: 13,
  fontFamily: "inherit",
  outline: "none",
  boxSizing: "border-box",
} as const;

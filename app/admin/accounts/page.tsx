"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type AdminAccount = {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  shop_id: string | null;
  shop_name: string | null;
  plan: string;
  credits: number;
};

export default function AdminAccountsPage() {
  const [accounts, setAccounts] = useState<AdminAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  const totalCredits = useMemo(
    () => accounts.reduce((total, account) => total + Number(account.credits ?? 0), 0),
    [accounts]
  );

  const loadAccounts = useCallback(async () => {
    setLoading(true);
    setStatus("");
    try {
      const res = await fetch("/api/admin/accounts");
      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error ?? "アカウント一覧を取得できませんでした");
      }

      setAccounts(data.accounts ?? []);
    } catch (error) {
      setAccounts([]);
      setStatus(error instanceof Error ? error.message : "アカウント一覧を取得できませんでした");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadAccounts();
  }, [loadAccounts]);

  return (
    <main style={{ minHeight: "100vh", background: "#071e28", color: "#f0ece4", fontFamily: "var(--font-lumiveil-sans)", padding: 18 }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
        <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <div style={{ color: "#c9a84c", fontSize: 11, letterSpacing: "0.08em", fontWeight: 500, marginBottom: 6 }}>LUMIVEIL ADMIN</div>
            <h1 style={{ fontSize: 24, fontWeight: 500, margin: 0 }}>アカウント管理</h1>
            <p style={{ marginTop: 6, color: "#9ba8ae", fontSize: 13 }}>登録ユーザーと各アカウントのクレジット残高を確認できます。</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <a href="/admin" style={smallButtonStyle}>生成履歴</a>
            <a href="/" style={smallButtonStyle}>アプリへ戻る</a>
            <button onClick={() => void loadAccounts()} disabled={loading} style={smallButtonStyle}>
              {loading ? "更新中..." : "更新"}
            </button>
          </div>
        </header>

        <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
          <div style={panelStyle}>
            <div style={metricLabelStyle}>登録アカウント</div>
            <div style={metricValueStyle}>{accounts.length.toLocaleString("ja-JP")}</div>
          </div>
          <div style={panelStyle}>
            <div style={metricLabelStyle}>合計クレジット残高</div>
            <div style={metricValueStyle}>{totalCredits.toLocaleString("ja-JP")}</div>
          </div>
        </section>

        {status ? (
          <div style={{ ...panelStyle, color: status.includes("権限") || status.includes("ログイン") ? "#b84242" : "#171717" }}>
            {status}
          </div>
        ) : null}

        {loading ? (
          <div style={panelStyle}>読み込み中...</div>
        ) : accounts.length > 0 ? (
          <div style={{ ...panelStyle, padding: 0, overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 820 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #a89e8e" }}>
                  <th style={thStyle}>メールアドレス</th>
                  <th style={thStyle}>クレジット</th>
                  <th style={thStyle}>プラン</th>
                  <th style={thStyle}>店舗名</th>
                  <th style={thStyle}>登録日</th>
                  <th style={thStyle}>最終ログイン</th>
                  <th style={thStyle}>ユーザーID</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map(account => (
                  <tr key={account.id} style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
                    <td style={tdStyle}>{account.email || "-"}</td>
                    <td style={{ ...tdStyle, fontWeight: 600 }}>{account.credits.toLocaleString("ja-JP")}</td>
                    <td style={tdStyle}>{account.plan}</td>
                    <td style={tdStyle}>{account.shop_name ?? "-"}</td>
                    <td style={tdStyle}>{formatDate(account.created_at)}</td>
                    <td style={tdStyle}>{account.last_sign_in_at ? formatDate(account.last_sign_in_at) : "-"}</td>
                    <td style={{ ...tdStyle, fontSize: 10, color: "#6a6258" }}>{account.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={panelStyle}>登録アカウントはまだありません。</div>
        )}
      </div>
    </main>
  );
}

function formatDate(value: string) {
  return new Date(value).toLocaleString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const panelStyle = {
  background: "#d0cabd",
  borderRadius: 8,
  padding: 14,
  border: "1px solid #9f9686",
  color: "#171717",
};

const smallButtonStyle = {
  padding: "8px 10px",
  borderRadius: 8,
  background: "#b0a898",
  border: "1px solid #a89e8e",
  color: "#111",
  fontWeight: 500,
  fontSize: 11,
  cursor: "pointer",
  textDecoration: "none",
};

const metricLabelStyle = {
  color: "#6a6258",
  fontSize: 11,
  fontWeight: 500,
  marginBottom: 6,
};

const metricValueStyle = {
  color: "#111",
  fontSize: 24,
  fontWeight: 600,
};

const thStyle = {
  padding: "11px 12px",
  textAlign: "left" as const,
  color: "#4e4a43",
  fontSize: 11,
  fontWeight: 600,
};

const tdStyle = {
  padding: "11px 12px",
  color: "#171717",
  fontSize: 12,
  verticalAlign: "top" as const,
};

export type TopupPackId = "starter" | "standard" | "pro" | "bulk";

export const TOPUP_PACKS: Record<TopupPackId, { name: string; credits: number; amount: number; caption: string }> = {
  starter: { name: "スターター", credits: 100, amount: 1000, caption: "まず試したい方向け" },
  standard: { name: "スタンダード", credits: 330, amount: 3000, caption: "日常運用にちょうどいい" },
  pro: { name: "プロ", credits: 580, amount: 5000, caption: "編集・動画も使う方向け" },
  bulk: { name: "まとめ買い", credits: 1200, amount: 10000, caption: "単価を抑えて多めに確保" },
};

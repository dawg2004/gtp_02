export type TopupPackId = "trial" | "basic" | "standard" | "mega";

export type TopupPack = {
  name: string;
  credits: number;
  amount: number;
  caption: string;
  originalAmount?: number;
  requiresInviteCode?: boolean;
};

export const TRIAL_INVITE_CODE = "lumilumi2026";

export const TOPUP_PACKS: Record<TopupPackId, TopupPack> = {
  trial: {
    name: "お試し",
    credits: 100,
    amount: 1000,
    caption: "招待コード限定",
    requiresInviteCode: true,
  },
  basic: {
    name: "ベーシック",
    credits: 650,
    amount: 22000,
    originalAmount: 27500,
    caption: "添付プランから20%割安",
  },
  standard: {
    name: "スタンダード",
    credits: 1600,
    amount: 36960,
    originalAmount: 46200,
    caption: "添付プランから20%割安",
  },
  mega: {
    name: "メガ",
    credits: 4800,
    amount: 70400,
    originalAmount: 88000,
    caption: "添付プランから20%割安",
  },
};

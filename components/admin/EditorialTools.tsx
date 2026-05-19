const tools = [
  ["記事編集", "レポート本文、抜粋、カバー画像を編集できます。"],
  ["写真ギャラリー", "イベント写真の並び順とaltテキストを管理します。"],
  ["イベント設定", "日付、場所、カテゴリ、ホスト、チケット情報を編集します。"],
  ["Supabase準備", "今は固定データ、次にDB投稿へ差し替えやすい構成です。"],
];

export function EditorialTools() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {tools.map(([title, description]) => (
        <article key={title} className="border border-stone-200 bg-white p-5">
          <h3 className="font-serif text-2xl text-stone-950">{title}</h3>
          <p className="mt-3 text-sm leading-6 text-stone-500">{description}</p>
          <button className="mt-5 text-xs font-semibold tracking-[0.16em] text-stone-950">OPEN</button>
        </article>
      ))}
    </section>
  );
}

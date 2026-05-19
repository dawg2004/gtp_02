const activities = [
  "発酵ワークショップのレポートを公開",
  "スタジオで聴くジャズの夜を予約投稿に設定",
  "写真ギャラリーに新しい画像を追加",
  "クリエイタートーク Vol.2 の下書きを更新",
];

export function RecentActivity() {
  return (
    <section className="border border-stone-200 bg-white p-6">
      <h2 className="font-serif text-3xl">Recent Activity</h2>
      <div className="mt-5 divide-y divide-stone-200">
        {activities.map((activity) => (
          <div key={activity} className="py-4 text-sm text-stone-700">{activity}</div>
        ))}
      </div>
    </section>
  );
}

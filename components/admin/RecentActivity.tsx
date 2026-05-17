const activities = ["Fermentation Workshop report published", "Jazz in the Studio scheduled", "New gallery uploaded", "Creator Talk draft updated"];

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

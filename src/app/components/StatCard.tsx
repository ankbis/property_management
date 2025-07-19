// src/components/StatCard.tsx

export function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}) {
  return (
    <div className="bg-slate-800 rounded-2xl p-8 flex flex-col items-start shadow-lg hover:bg-indigo-700 transition h-full">
      {icon && <div className="text-4xl mb-3">{icon}</div>}
      <div className="text-lg text-slate-400 font-semibold mb-1">{title}</div>
      <div className="text-3xl font-bold text-white">{value}</div>
    </div>
  );
}

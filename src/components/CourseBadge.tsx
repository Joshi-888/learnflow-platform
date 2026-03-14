import { Award, Flame, Sparkles, TrendingUp } from "lucide-react";

const badgeConfig = {
  Premium: { icon: Award, className: "bg-violet-100 text-violet-700 border-violet-200" },
  Bestseller: { icon: TrendingUp, className: "bg-amber-100 text-amber-700 border-amber-200" },
  New: { icon: Sparkles, className: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  Hot: { icon: Flame, className: "bg-rose-100 text-rose-700 border-rose-200" },
};

interface CourseBadgeProps {
  badge: keyof typeof badgeConfig;
}

export function CourseBadge({ badge }: CourseBadgeProps) {
  const config = badgeConfig[badge];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1 rounded-sm border px-1.5 py-0.5 text-[10px] font-semibold ${config.className}`}>
      <Icon className="h-3 w-3" />
      {badge}
    </span>
  );
}

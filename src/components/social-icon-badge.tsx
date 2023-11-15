import { Socicons } from "socicons";
import { cn } from "@/lib/utils";

interface SocialIconBadgeProps {
  width: string;
  iconSize: number;
  icon: string;
}

export function SocialIconBadge({
  width,
  iconSize,
  icon,
}: SocialIconBadgeProps): JSX.Element {
  return (
    <div
      className={cn(
        "w-12 h-12 pl-0.5 grid place-items-center flex-shrink-0 rounded-xl bg-onyx border border-slate-100/10",
        width,
      )}
    >
      <Socicons
        icon={icon.toLocaleLowerCase().trim()}
        size={iconSize}
        color="#DBDEE1"
      />
    </div>
  );
}

import { memo } from "react";
import { cn } from "@/lib/utils";
import type { PasswordQualityType } from "@/lib/hooks/use-password";

function QualityIndicator({ color, status }: PasswordQualityType): JSX.Element {
  return (
    <div
      className={cn(
        "uppercase text-silver font-semibold",
        "text-[10px] md:text-xs",
        "w-fit h-fit rounded-[6px]",
        "py-0 px-1 md:px-2 md:py-1",
        color,
      )}
    >
      {status}
    </div>
  );
}

export default memo(QualityIndicator);

import React from "react";
import { cn } from "@/lib/utils";

interface IconProps extends React.ComponentPropsWithoutRef<"img"> {
  svgURL: string;
}

export function Icon({ svgURL, ...props }: IconProps): JSX.Element {
  return (
    <div
      className={cn(
        "transition-all duration-300 bg-transparent hover:bg-[rgba(41,45,65,.35)]",
        "cursor cursor-pointer rounded-lg md:rounded-xl",
        "min-w-fit min-h-fit p-2",
      )}
    >
      <img
        src={svgURL}
        className="w-3 h-3.5 md:w-4 md:h-4"
        alt="action icon"
        draggable="false"
        {...props}
      />
    </div>
  );
}

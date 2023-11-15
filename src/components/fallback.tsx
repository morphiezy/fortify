import { Bird } from "lucide-react";

export function Fallback({ text }: { text: string }): JSX.Element {
  return (
    <div className="w-full h-full flex-1 grid place-items-center opacity-70">
      <div className="flex flex-col items-center space-y-3">
        <Bird className="text-zinc-700" size={45} />
        <p className="text-sm text-zinc-700 font-inter font-semibold">{text}</p>
      </div>
    </div>
  );
}

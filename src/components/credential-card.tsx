import { Link } from "react-router-dom";
import { SocialIconBadge } from "./social-icon-badge";

export function CredentialCard({
  id,
  platform,
  name,
  account,
}: Record<string, string>): JSX.Element {
  return (
    <Link
      to={`/c/${id}`}
      className="w-full flex items-center space-x-3.5 px-2.5 py-2.5 hover:bg-white/5 rounded-md transition-all duration-200"
    >
      <SocialIconBadge
        icon={platform.toLocaleLowerCase().trim()}
        iconSize={21}
        width="w-12 h-12"
      />
      <div className="flex-1">
        <h1 className="line-clamp-1 text-base font-medium text-silver mb-[1px]">
          {name}
        </h1>
        <p className="line-clamp-1 text-xs font-medium text-indigo">
          {account}
        </p>
      </div>
    </Link>
  );
}

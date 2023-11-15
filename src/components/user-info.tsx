import { useAuth } from "@/lib/context/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserInfo(): JSX.Element {
  const { user } = useAuth();

  return (
    <div className="flex items-center space-x-3">
      <Avatar className="w-10 h-10 rounded-full overflow-hidden">
        <AvatarImage src={user.photoURL!} alt={user.displayName!} />
        <AvatarFallback className="bg-sapphire rounded-full border border-slate-100/5 text-silver uppercase font-inter font-semibold text-sm">
          {user.email!.slice(0, 2)}
        </AvatarFallback>
      </Avatar>
      <div className="w-full font-inter">
        <p className="text-sm text-silver line-clamp-1 font-medium">
          {user.displayName}
        </p>
        <p className="text-xs text-indigo line-clamp-1">{user.email}</p>
      </div>
    </div>
  );
}

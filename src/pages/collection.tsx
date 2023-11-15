import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { onSnapshot, QuerySnapshot } from "firebase/firestore";
import { Search, LogOut } from "lucide-react";
import { useAuth } from "@/lib/context/auth";
import { Credential } from "@/lib/types/credential";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import {
  getCredentials,
  queryCredentialsByUserId,
} from "@/lib/firebase/collection";
import { CredentialCard } from "@/components/credential-card";
import { Button, Input, Spinner } from "@/components/ui";
import { useToast } from "@/lib/hooks/use-toast";
import { Fallback } from "@/components/fallback";
import { UserInfo } from "@/components/user-info";
import { ModalSignOut } from "@/components/modal/modal-signout";
import { cn } from "@/lib/utils";

export interface CollectionState
  extends Pick<Credential, "name" | "account" | "platform"> {
  id: string;
}

export default function Collection(): JSX.Element {
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [credentials, setCredentials] = useState<CollectionState[] | []>([]);

  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const location = useLocation();
  const matches = useMediaQuery("(min-width:1280px)");

  const getInitialCredentials = async () => {
    try {
      const snapshot = await getCredentials(user.id);
      updateCredential(snapshot);
    } catch (error) {
      toast({ title: "Failed to get credentials" });
    } finally {
      setLoading(false);
    }
  };

  const updateCredential = (snapshot: QuerySnapshot) => {
    const documents = snapshot.docs.map((doc) => {
      const { account, platform, name } = doc.data();
      return {
        id: doc.id,
        name,
        account,
        platform,
      };
    });

    setCredentials(documents);
  };

  const resultSearchData = useMemo((): CollectionState[] => {
    const newCredentials = JSON.parse(JSON.stringify(credentials));
    return newCredentials.filter((item: CollectionState) => {
      const name = item.name.toLowerCase();
      const platform = item.platform.toLocaleLowerCase();

      return name.indexOf(search) > -1 || platform.indexOf(search) > -1;
    });
  }, [credentials, search]);

  useEffect(() => {
    if (matches && location.pathname === "/collection")
      navigate("/home", { replace: true });

    getInitialCredentials();
  }, []);

  useEffect(() => {
    if (loading) return;

    const unsubCredentials = onSnapshot(
      queryCredentialsByUserId(user.id),
      (snapshot) => updateCredential(snapshot),
    );

    return () => unsubCredentials();
  }, [loading]);

  return (
    <div
      className={cn("flex flex-col bg-black pt-24 pb-1 xl:pb-0 xl:pt-0 h-full")}
    >
      <div className="w-full h-fit mb-6 px-4 relative xl:mt-10">
        <Input
          placeholder="Search..."
          className="pl-11 sm:pl-11 sm:h-12 sm:rounded-xl sm:text-sm"
          onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}
        />
        <Search
          size={19}
          color="#535455"
          className="absolute left-[32px] top-1/2 -translate-y-1/2"
        />
      </div>
      {loading ? (
        <div className="flex-1 w-full h-full grid place-items-center">
          <Spinner size="w-6 h-6" />
        </div>
      ) : resultSearchData.length ? (
        <div className="flex-1 overflow-y-auto scrollbar px-2">
          {resultSearchData.map((credential: CollectionState) => (
            <CredentialCard key={credential.id} {...credential} />
          ))}
        </div>
      ) : (
        <Fallback text="There's no collection here" />
      )}
      {matches ? (
        <div className="flex justify-between items-center px-4 py-5 border-t border-t-slate-100/5">
          <UserInfo />
          <ModalSignOut
            trigger={
              <Button className="bg-transparent hover:bg-transparent text-silver hover:text-silver/50 w-fit h-fit">
                <LogOut size={19} />
              </Button>
            }
          />
        </div>
      ) : (
        false
      )}
    </div>
  );
}

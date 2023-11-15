import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/context/auth";
import { queryHistory } from "@/lib/firebase/collection";
import { onSnapshot, QuerySnapshot } from "firebase/firestore";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import { Fallback } from "@/components/fallback";
import { Spinner } from "@/components/ui";
import { formateDate } from "@/lib/utils";

type HistoryState = {
  id: string;
  description: string;
  createdAt: string;
}[];

export default function History(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  const [histories, setHistory] = useState<HistoryState | []>([]);

  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const matches = useMediaQuery("(min-width:1280px)");

  useEffect(() => {
    if (matches && location.pathname === "/history")
      navigate("/home", { replace: true });
  }, []);

  useEffect(() => {
    const unsubHistory = onSnapshot(
      queryHistory(user.id),
      (snapshot: QuerySnapshot) => {
        const documents = snapshot.docs.map((doc) => {
          const { description, createdAt } = doc.data();

          return {
            id: doc.id,
            description,
            createdAt: formateDate(createdAt.toDate()),
          };
        });

        setHistory(documents as HistoryState);
        setLoading(false);
      },
    );

    return () => unsubHistory();
  }, []);

  return (
    <div className="flex flex-col h-full pt-24 pb-2 bg-black xl:py-0 xl:my-10 space-y-6">
      <div className="px-6">
        <h1 className="text-xl text-silver font-semibold pb-2.5 border-b border-b-slate-100/5">
          History
        </h1>
      </div>
      {loading ? (
        <div className="flex-1 w-full h-full grid place-items-center">
          <Spinner size="w-6 h-6" />
        </div>
      ) : histories.length ? (
        <div className="w-full h-full px-6 space-y-5 overflow-y-auto scrollbar">
          {histories.map((history) => (
            <div className="font-inter" key={history.id}>
              <h1 className="text-sm text-silver font-medium">
                {history.description}
              </h1>
              <span className="text-xs text-indigo">{history.createdAt}</span>
            </div>
          ))}
        </div>
      ) : (
        <Fallback text="There's no history here" />
      )}
    </div>
  );
}

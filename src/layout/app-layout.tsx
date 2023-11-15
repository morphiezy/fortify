import { Outlet } from "react-router-dom";
import { ModalMenu } from "@/components/modal/modal-menu";
import { useMediaQuery } from "@/lib/hooks/use-media-query";

import Collection from "@/pages/collection";
import History from "@/pages/history";

export default function AppLayout(): JSX.Element {
  const matches = useMediaQuery("(min-width: 1280px)");

  return (
    <div className="w-full h-full grid grid-cols-[1fr] xl:grid-cols-[360px_1fr_360px] auto-rows-[100dvh] animate-in slide-in-from-bottom-5 fade-in-0 duration-700">
      {!matches ? <ModalMenu /> : false}
      {matches ? <Collection /> : false}
      <div className="bg-black xl:border-x border-x-graphite">
        <Outlet />
      </div>
      {matches ? <History /> : false}
    </div>
  );
}

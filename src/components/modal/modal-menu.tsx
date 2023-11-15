import { useState } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Button } from "../ui";
import { UserInfo } from "../user-info";
import { ChevronDown } from "lucide-react";
import { ModalSignOut } from "./modal-signout";

export function ModalMenu(): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <Button
        onClick={() => setOpen(true)}
        className="fixed top-6 right-6 flex items-center rounded-full bg-zinc-700/20 min-w-fit h-10 px-4 text-xs font-semibold border border-slate-100/5 hover:bg-onyx"
      >
        <p>Menu</p>
        <ChevronDown className="text-silver ml-3 mt-0.5" size={12} />
      </Button>
      <AlertDialogContent className="gap-0 srounded-3xl w-[85%] p-8 top-10 left-1/2 -translate-y-0 -translate-x-1/2">
        <Button
          asChild
          className="block ml-auto h-fit w-fit p-0 bg-transparent hover:bg-transparents"
          onClick={() => setOpen(false)}
        >
          <X size={18} className="text-silver/60" />
        </Button>
        <div className="mt-4">
          <UserInfo />
        </div>
        <div className="mt-10 space-y-5">
          <div className="flex items-center justify-between pb-2.5 border-b border-b-slate-100/5">
            <h1 className="font-semibold text-silver/60 text-sm font-inter">
              Menu
            </h1>
          </div>
          <div className="space-y-5 text-silver font-inter [&>a]:block">
            <Link onClick={() => setOpen(false)} to="/">
              Home
            </Link>
            <Link onClick={() => setOpen(false)} to="/collection">
              Collections
            </Link>
            <Link onClick={() => setOpen(false)} to="/history">
              Activity history
            </Link>
            <ModalSignOut
              trigger={
                <Button className="bg-transparent h-fit w-full justify-start p-0 text-silver text-base hover:bg-transparent">
                  Logout
                </Button>
              }
            />
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui";
import PinInput from "react-pin-input";
import { Spinner } from "../ui";

interface ModalPinProps {
  icon: string;
  title: string;
  description: string;
  action: () => void;
  actionText: string;
  open: boolean;
  loading: boolean;
  pinChange: (pin: string) => void;
}

export function ModalPin({
  icon,
  title,
  description,
  action,
  actionText,
  open,
  loading,
  pinChange,
}: ModalPinProps): JSX.Element {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent
        onOpenAutoFocus={(e: Event) => e.preventDefault()}
        onEscapeKeyDown={(e: Event) => e.preventDefault()}
        onCloseAutoFocus={(e: Event) => e.preventDefault()}
        className="px-8 py-10 w-full max-w-[360px] sm:max-w-[420px] gap-9"
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            <p className="text-4xl sm:text-5xl mb-5">{icon}</p>
            <p>{title}</p>
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <PinInput
          secretDelay={300}
          length={4}
          onComplete={pinChange}
          disabled={loading}
          focus={true}
          type="numeric"
          inputMode="number"
          style={{ padding: "10px" }}
          inputStyle={{ borderColor: "transparent" }}
          inputFocusStyle={{ borderColor: "transparent" }}
          autoSelect={true}
          regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
        />
        <AlertDialogFooter className="sm:justify-center">
          {loading ? (
            <Spinner size="w-6 h-6" />
          ) : (
            <Button className="w-full h-12 rounded-xl" onClick={action}>
              {actionText}
            </Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

import { lazy, useState, Suspense } from "react";
import { serverTimestamp } from "firebase/firestore";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/lib/context/auth";
import { useToast } from "@/lib/hooks/use-toast";
import { saveCredential, updateUserPin } from "@/lib/firebase/utils";
import { FormSubmitHandler } from "@/lib/types/form";
import { encrypt } from "@/lib/crypto";
import { ModalPin } from "@/components/modal/modal-setup-pin";
import { Spinner } from "@/components/ui";

const Form = lazy(async () => ({
  default: (await import("@/components/form")).Form,
}));

export default function Home(): JSX.Element {
  const { user } = useAuth();
  const { toast } = useToast();

  const [loading, setLoading] = useState<boolean>(false);
  const [pin, setPin] = useState<string>("");

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const saveUserPin = async (): Promise<void> => {
    const encryptPin = encrypt(pin, user.id);

    try {
      setLoading(true);
      updateUserPin({ id: user.id, pin: encryptPin });
      toast({
        title: "setup pin success",
        description: "now you can start manage your password",
      });
    } catch (error) {
      toast({ title: "Failed to setup pin" });
    } finally {
      setLoading(false);
    }
  };

  const handlePinChange = (pin: string) => setPin(pin);

  const savePassword: FormSubmitHandler = async (data, reset) => {
    try {
      await saveCredential({
        ...data,
        user: user.id,
        createdAt: serverTimestamp(),
      });
      toast({
        title: "Saving credentials success",
        description: "Now credentials already in your collections",
      });

      if (reset) reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to save password",
        description: "please try again later",
      });
    }
  };

  return (
    <div className="h-full flex flex-col overflow-y-auto scrollbar">
      {!user.pin ? (
        <ModalPin
          icon="⚔️"
          title="Enhance Your Security"
          description="Let's choose your best pin before saving your credentials over here."
          actionText="Setup Pin"
          open={!user.pin}
          loading={loading}
          action={saveUserPin}
          pinChange={handlePinChange}
        />
      ) : (
        false
      )}
      <div className="max-w-[680px] w-full h-auto mx-auto px-6 py-24 xl:py-10 flex-1">
        {user.pin ? (
          <Suspense
            fallback={
              <div className="w-full h-[100dvh] grid place-items-center animate-pulse">
                <Spinner size="w-6 h-6 md:w-7 md:h-7" />
              </div>
            }
          >
            <Form
              formSubmit={savePassword}
              passwordGenerator={{
                passwordSize: 24,
              }}
            />
          </Suspense>
        ) : (
          false
        )}
      </div>
    </div>
  );
}

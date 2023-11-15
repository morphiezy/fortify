import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/lib/context/auth";
import { useToast } from "@/lib/hooks/use-toast";
import { getCredentialById } from "@/lib/firebase/collection";
import { Credential } from "@/lib/types/credential";
import { Spinner, Button } from "@/components/ui";
import { Fallback } from "@/components/fallback";
import { Form } from "@/components/form";
import { decrypt } from "@/lib/crypto";
import { SocialIconBadge } from "@/components/social-icon-badge";
import { formateDate } from "@/lib/utils";
import { deleteCredential, updateCredential } from "@/lib/firebase/utils";
import { FormSchema } from "@/lib/validations/form-validation";

export default function Detail() {
  const [credential, setCredential] = useState<Credential | null | undefined>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const params = useParams();
  const { toast } = useToast();
  const { user } = useAuth();

  const getCredential = async () => {
    try {
      setLoading(true);

      const doc = await getCredentialById(params.id!);
      const data = doc.data();

      if (data) {
        setCredential({
          ...data,
          createdAt: data.createdAt.toDate(),
          password: decrypt(data.password, user.pin!),
        } as Credential);
      } else {
        setCredential(data);
      }
    } catch (error) {
      toast({
        title: "failed",
        description: "we can't get your password information",
      });
    } finally {
      setLoading(false);
    }
  };

  const updating = async (data: FormSchema) => {
    if (!params.id || !credential) return;

    const message =
      data.name !== credential.name
        ? `Update name ${credential.name} → ${data.name}`
        : `${credential.name} password was updated`;

    try {
      await updateCredential(data, params.id, user.id, message);

      toast({
        title: "success",
        description: "Password detail updated",
      });

      getCredential();
    } catch (error) {
      toast({ title: "Failed to update your password" });
    }
  };

  const deleting = async (): Promise<void> => {
    if (!params.id || !credential) return;

    try {
      await deleteCredential(params.id, user.id, credential.name);
      toast({ title: "success", description: "password deleted successfully" });
      navigate("/home", { replace: true });
    } catch (error) {
      toast({ title: "Failed to delete your password" });
    }
  };

  useEffect(() => {
    getCredential();
  }, [params.id]);

  return (
    <div className="h-full flex flex-col pb-5 pt-24 xl:py-10">
      {loading || credential === undefined ? (
        <div className="w-full h-screen flex-1 grid place-items-center">
          {loading ? (
            <Spinner size="w-6 h-6" />
          ) : (
            <Fallback text="Credential not found" />
          )}
        </div>
      ) : credential ? (
        <div className="flex flex-col h-full font-inter space-y-6">
          <div className="px-6 xl:px-10 ">
            <div className="flex items-center space-x-5 xl:space-x-6 w-full pb-6 border-b border-b-slate-100/5">
              <SocialIconBadge
                width="w-14 h-14"
                iconSize={28}
                icon={credential.platform}
              />
              <div className="w-full">
                <h1 className="text-silver text-xl font-semibold mb-0.5 line-clamp-1">
                  {credential.name}
                </h1>
                <p className="text-indigo text-sm font-normal line-clamp-1">
                  {formateDate(credential.createdAt)}
                </p>
              </div>
            </div>
          </div>

          <div className="px-6 xl:px-10 w-full flex flex-col overflow-y-auto scrollbar">
            <Form
              defaultValues={{
                name: credential.name,
                password: credential.password,
                account: credential.account,
                platform: credential.platform,
              }}
              passwordGenerator={{
                defaultPw: credential.password,
                passwordSize: credential.password.length,
              }}
              formSubmit={updating}
            />
            <Button
              variant="outline"
              className="w-full min-h-[56px] mt-5"
              onClick={deleting}
            >
              Delete
            </Button>
          </div>
        </div>
      ) : (
        false
      )}
    </div>
  );
}

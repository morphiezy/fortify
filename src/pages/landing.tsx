import { Navigate } from "react-router-dom";
import { useAuth } from "@/lib/context/auth";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { PasswordGenerator } from "@/components/password-generator";
import Google from "@/assets/google.svg";

export default function Landing(): JSX.Element {
  const { user, loading, signInWithGoogle } = useAuth();

  if (loading) return <h1>Loading...</h1>;
  if (user) return <Navigate to="/home" replace />;

  return (
    <div className="relative w-full min-h-[680px] h-screen">
      <div className="grid-bg ba-grid anim">
        <div className="inner"></div>
      </div>
      <div
        className={cn(
          "absolute w-full h-full top-0 left-0 right-0 bottom-0 z-50",
          "flex flex-col justify-center items-center",
        )}
      >
        <div className="flex flex-col items-center min-w-0 w-full h-auto p-4 mx-auto">
          <div className="font-inter text-center w-full">
            <h1
              className={cn(
                "text-2xl sm:text-4xl md:text-5xl text-silver font-bold",
                "mx-auto md:w-full",
              )}
            >
              Build secure password easily
            </h1>
            <p className="text-base md:text-lg text-indigo mt-1 md:mt-4">
              Create a secure password and make it easy to manage.
            </p>
          </div>
          <div
            className={cn(
              "w-full max-w-[685px] h-auto mt-10 mb-10",
              "bg-[#0A0D1C] rounded-2xl border border-[#191F39]",
              "py-8 px-6 md:py-12 md:px-14 md:rounded-[20px]",
            )}
          >
            <PasswordGenerator passwordSize={24} />
          </div>
          <div className="w-full md:mt-4 text-center">
            <p className="text-indigo text-xs font-medium">
              Need help to manage your password?
              <span className="ml-1 font-bold">Let’s join first.</span>
            </p>
            <Button
              onClick={signInWithGoogle}
              name="sign in"
              className="bg-white w-[220px] h-[60px] mt-10 rounded-full text-graphite text-sm hover:bg-white"
            >
              <img
                src={Google}
                alt="google logo"
                width="28px"
                height="28px"
                className="w-7 h-7 mr-4"
              />
              <p className="-mt-0.5 font-semibold">Sign in with Google</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

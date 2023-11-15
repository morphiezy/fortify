import { AuthProvider } from "@/lib/context/auth";
import { Outlet } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";

export default function App(): JSX.Element {
  return (
    <>
      <Toaster />
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </>
  );
}

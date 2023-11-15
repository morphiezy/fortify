import { useAuth } from "@/lib/context/auth";
import { Navigate } from "react-router-dom";
import { Loading } from "@/components/loading";

type PrivateRouterProps = {
  children: JSX.Element;
  redirect: string;
};

export default function PrivateRouter({
  children,
  redirect,
}: PrivateRouterProps): JSX.Element {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;

  return user ? children : <Navigate to={redirect} replace />;
}

import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import PrivateRouter from "./private-router";
import { Loading } from "@/components/loading";

const AppLayout = lazy(() => import("@/layout/app-layout"));
const Home = lazy(() => import("@/pages/home"));
const Landing = lazy(() => import("@/pages/landing"));
const Collection = lazy(() => import("@/pages/collection"));
const Detail = lazy(() => import("@/pages/detail"));
const History = lazy(() => import("@/pages/history"));

export const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <h1>Error 404</h1>,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        element: (
          <PrivateRouter redirect="/">
            <Suspense fallback={<Loading />}>
              <AppLayout />
            </Suspense>
          </PrivateRouter>
        ),
        children: [
          {
            path: "home",
            element: <Home />,
          },
          {
            path: "collection",
            element: <Collection />,
          },
          {
            path: "c/:id",
            element: (
              <Suspense fallback={null}>
                <Detail />
              </Suspense>
            ),
          },
          {
            path: "/history",
            element: <History />,
          },
        ],
      },
    ],
  },
]);

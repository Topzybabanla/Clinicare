import { createBrowserRouter, RouterProvider } from "react-router";
import { lazy, Suspense } from "react";
import { LazyLoader } from "@/components/LazyLoader";
import AuthLayout from "../layouts/AuthLayout";
import ResetPassword from "../pages/resetpassword/ResetPassword";
import SignUp from "../pages/sign-up/SignUp";
import SuspenseUI from "../components/SuspenseUI";
import OnboardingLayout from "../layouts/OnboardingLayout";
import PatientOnboard from "../pages/patient-onboard/PatientOnboard";
import VerifyAccount from "../pages/verify-account/VerifyAccount";
import DashboardLayout from "../layouts/DashboardLayout";
import ForgotPassword from "../pages/forgot-password/ForgotPassword";
import { PublicRoutes, PrivateRoutes } from "./ProtectedRoutes";
import { useAuth } from "../store";

//render pages
const RootLayout = lazy(() => import("@/layouts/RootLayouts"));
const Home = lazy(() => import("@/pages/home/Home"));
const Contact = lazy(() => import("@/pages/contact/Contact"));
const Login = lazy(() => import("@/pages/login/Login"));

export default function AppRoutes() {
  const { accessToken, user } = useAuth();
  // const { isCheckingAuth } = useAuth();
  // if (isCheckingAuth) {
  //   return <SuspenseUI />;
  // }
  const routes = [
    {
      element: (
        <Suspense fallback={<SuspenseUI />}>
          <PublicRoutes accessToken={accessToken}>
            <RootLayout />
          </PublicRoutes>
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<SuspenseUI />}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "/contact",
          element: (
            <Suspense fallback={<SuspenseUI />}>
              <Contact />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "account",
      element: (
        <Suspense fallback={<SuspenseUI />}>
          <PublicRoutes accessToken={accessToken}>
            <AuthLayout />
          </PublicRoutes>
        </Suspense>
      ),
      children: [
        {
          path: "signin",
          element: (
            <Suspense fallback={<SuspenseUI />}>
              <Login />
            </Suspense>
          ),
        },
        {
          path: "reset-password",
          element: (
            <Suspense fallback={<SuspenseUI />}>
              <ResetPassword />
            </Suspense>
          ),
        },
        {
          path: "signup",
          element: (
            <Suspense fallback={<SuspenseUI />}>
              <SignUp />
            </Suspense>
          ),
        },
        {
          path: "forgot-password",
          element: (
            <Suspense fallback={<SuspenseUI />}>
              <ForgotPassword />
            </Suspense>
          ),
        },
      ],
    },
    {
      element: (
        <Suspense fallback={<SuspenseUI />}>
          <PrivateRoutes accessToken={accessToken} user={user}>
            <OnboardingLayout />
          </PrivateRoutes>
        </Suspense>
      ),
      children: [
        {
          path: "patient-onboard",
          element: (
            <Suspense fallback={<SuspenseUI />}>
              <PatientOnboard />
            </Suspense>
          ),
        },
        {
          path: "verify-account",
          element: (
            <Suspense fallback={<SuspenseUI />}>
              <VerifyAccount />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "dashboard",
      element: (
        <Suspense fallback={<LazyLoader />}>
          <PrivateRoutes accessToken={accessToken} user={user}>
            <DashboardLayout />
          </PrivateRoutes>
        </Suspense>
      ),
    },
  ];
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}

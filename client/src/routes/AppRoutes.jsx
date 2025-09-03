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
import { PublicRoutes, PrivateRoutes, VerifiedRoutes } from "./ProtectedRoutes";
import { useAuth } from "../store";
import Account from "../pages/settings/account/Account";
import Settings from "../pages/settings/Settings";
import Password from "../pages/settings/password/Password";
import HealthRecord from "../pages/settings/health-record/HealthRecord";
import Users from "../pages/users/Users";
import Patients from "../pages/patients/Patients";
import Payments from "../pages/payments/Payments";
import Appointments from "../pages/Appointments/Appointments";
import ErrorBoundary from "../components/ErrorBoundary";
import Doctors from "../pages/doctors/Doctors";
import Rooms from "../pages/rooms/Rooms";
import Inpatients from "../pages/inpatients/Inpatients";
import Dashboard from "../pages/dashboard/Dashboard";

//render pages
const RootLayout = lazy(() => import("@/layouts/RootLayouts"));
const Home = lazy(() => import("@/pages/home/Home"));
const Contact = lazy(() => import("@/pages/contact/Contact"));
const Login = lazy(() => import("@/pages/login/Login"));
const PatientPayments = lazy(() => import("@/pages/payments/PatientPayments"));
const PatientsAppointments = lazy(() =>
  import("@/pages/Appointments/PatientsAppointments")
);

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
      errorElement: <ErrorBoundary />,
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
      errorElement: <ErrorBoundary />,
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
          <VerifiedRoutes accessToken={accessToken} user={user}>
            <OnboardingLayout />
          </VerifiedRoutes>
        </Suspense>
      ),
      errorElement: <ErrorBoundary />,
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
      errorElement: <ErrorBoundary />,
      children: [
        {
          path: "settings",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Settings />
            </Suspense>
          ),
          children: [
            {
              path: "account",
              element: (
                <Suspense fallback={<LazyLoader />}>
                  <Account />
                </Suspense>
              ),
            },
            {
              path: "password",
              element: (
                <Suspense fallback={<LazyLoader />}>
                  <Password />
                </Suspense>
              ),
            },
            {
              path: "health",
              element: (
                <Suspense fallback={<LazyLoader />}>
                  <HealthRecord />
                </Suspense>
              ),
            },
          ],
        },
        {
          path: "users",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Users />
            </Suspense>
          ),
        },
        {
          index: true,
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Dashboard />
            </Suspense>
          ),
        },
        {
          path: "patients",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Patients />
            </Suspense>
          ),
        },
        {
          path: "payments",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Payments />
            </Suspense>
          ),
        },
        {
          path: "doctors",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Doctors />
            </Suspense>
          ),
        },
        {
          path: "rooms",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Rooms />
            </Suspense>
          ),
        },
        {
          path: "patient-payments",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <PatientPayments />
            </Suspense>
          ),
        },
        {
          path: "appointments",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Appointments />
            </Suspense>
          ),
        },
        {
          path: "inpatients",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Inpatients />
            </Suspense>
          ),
        },
        {
          path: "patient-appointments",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <PatientsAppointments />
            </Suspense>
          ),
        },
      ],
    },
  ];
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}

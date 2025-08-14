import { RiUser3Line, RiUser4Fill } from "@remixicon/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";
import { validateSignInSchema } from "../../utils/dataSchema";
import ErrorAlert from "../../components/ErrorAlert";
import { useState } from "react";
import { toast } from "sonner";
import { loginUser } from "../../api/auth";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../store";

export default function Login() {
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(validateSignInSchema),
  });

  const { setAccessToken } = useAuth();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (response) => {
      // console.log(response);
      toast.success(response?.data?.message || "Login Successfull");
      setAccessToken(response?.data?.data?.accessToken);
    },
    onError: (error) => {
      console.log(error);
      setError(error?.response?.data?.message || "Login failed");
    },
  });

  // const navigate = useNavigate()
  // const { setAccessToken } = useAuth()

  const togglepassword = () => {
    setIsVisible((prev) => !prev);
  };

  const onFormSubmit = async (formData) => {
    mutation.mutate(formData);

    // try {
    //   const res = await loginUser(formData);
    //   if (res.status === 200) {
    //     toast.success(
    //       `Welcome ${res.data.firstName + " " + res.data.lastName}`
    //     );
    //   }
    // } catch (error) {
    //   console.log(error);
    //   setErrorMsg(error?.response?.data?.message);
    // }
  };
  return (
    <>
      <div className="w-full max-w-[400px] mx-auto mt-15 border-white shadow-2xl bg-white rounded py-15 px-6 md:px-[320]">
        <div className="flex items-center justify-center">
          <RiUser4Fill size={40} color="blue" className="border rounded-full" />
        </div>
        <h1 className="font-bold text-3xl mb-6 mt-6 text-center">
          Welcome Back
        </h1>
        <p className="text-sm text-center">
          Glad to see you again. Log in to your account.
        </p>

        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div>
            {error && <ErrorAlert error={error} />}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email</legend>
              <input
                type="email"
                className="input"
                placeholder="Email"
                {...register("email")}
                id="email"
              />
            </fieldset>
            {errors.email?.message && (
              <span className="text-xs text-red-500">
                {errors.email?.message}
              </span>
            )}
          </div>
          <div>
            <fieldset className="fieldset relative">
              <legend className="fieldset-legend">Password</legend>
              <input
                type={isVisible ? "text" : "Password"}
                className="input"
                placeholder="Password"
                {...register("password")}
                id="Password"
              />
            </fieldset>
            {errors.password?.message && (
              <span className="text-xs text-red-500">
                {errors.password?.message}
              </span>
            )}
            <Link
              to="/account/forgot-password"
              className="text-xs text-blue-500 hover:underline cursor-pointer"
            >
              Forgot password?
            </Link>
          </div>

          <button
            className="w-full btn text-white bg-blue-500 hover:bg-blue-700 cursor-pointer mt-4 mb-4 "
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Dont't have an account?{" "}
          <Link
            to="/account/signup"
            className={"text-blue-600 font-semibold hover:underline"}
          >
            Sign Up
          </Link>
        </p>
      </div>
    </>
  );
}

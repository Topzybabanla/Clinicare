import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useState } from "react";
import { Link } from "react-router";
import { validateSignUpSchema } from "../../utils/dataSchema";
import ErrorAlert from "../../components/ErrorAlert";
import { useForm } from "react-hook-form";
import { registerUser } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { RiUser4Fill } from "@remixicon/react";
import { toast } from "sonner";
import { useAuth } from "../../store";

export default function SignUp() {
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const togglepassword = () => {
    setIsVisible((prev) => !prev);
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(validateSignUpSchema),
  });

  const { setAccessToken } = useAuth();
  // const queryClient = useQueryClient(); //initializing our queryclient from tanstack

  // mutations are for create, update or delete actions
  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (response) => {
      // what you want to do if api call is success
      // console.log(response);
      toast.success(response?.data?.message || "Registration successful");
      setAccessToken(response?.data?.data?.accessToken);
      // save accessToken
    },
    onError: (error) => {
      console.log(error);
      setError(error?.response?.data?.message || "Registration failed");
      // toast.error(error?.response?.data?.message || "Registration failed");
    },
  });

  const onFormSubmit = async (formData) => {
    mutation.mutate(formData); //submiting our form to our mutation function to help us make the api call using our registerUser api
  };

  return (
    <>
      <div className="w-full max-w-[400px] mx-auto mt-20  bg-white border  rounded py-15 px-6 md:px-[320]">
        <div className="flex items-center justify-center">
          <RiUser4Fill size={40} color="blue" />
        </div>
        <h1 className="font-bold text-3xl mb-6 mt-6 text-center">
          Create Account
        </h1>
        <p className="text-center pb-5">
          Join Clinicare to start managing your health easily.
        </p>

        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div>
            {error && <ErrorAlert error={error} />}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Full name</legend>
              <input
                type="text"
                className="input"
                placeholder="Full name"
                {...register("fullname")}
                id="text"
              />
            </fieldset>
            {errors.fullname?.message && (
              <span className="text-xs text-red-500">
                {errors.fullname?.message}
              </span>
            )}
          </div>
          <div>
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
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="Password"
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
            {/* <NavLink to={"../resetpassword"} className="text-xs text-blue-500 hover:underline cursor-pointer">Forgot password?</NavLink> */}
          </div>

          <button
            className="w-full btn text-white bg-blue-500 hover:bg-blue-700 cursor-pointer mt-4 mb-4 "
            type="submit"
            disabled={isSubmitting || mutation.isPending}
          >
            {isSubmitting || mutation.isPending ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/account/signin" className={"hover:underline text-blue-700"}>
            Login
          </Link>
        </p>
      </div>
    </>
  );
}

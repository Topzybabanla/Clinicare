import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { validateConfirmPasswordSchema } from "../../utils/dataSchema";
import ErrorAlert from "../../components/ErrorAlert";
import { toast } from "sonner";
import { resetPassword } from "../../api/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router";


export default function ResetPassword() {
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(validateConfirmPasswordSchema),
  });
  // look for values on our url bar
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  console.log({ email, token });

  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: (response) => {
      toast.success(response?.data?.message);
      navigate("/account/signin");
    },
    onError: (error) => {
      console.log(error);
      setError(error?.response?.data?.message);
    },
  });
  const onSubmit = async (data) => {
    const userData = { ...data, email, token };
    mutation.mutate(userData);
  };

  return (
    <>
      <div className="w-full max-w-[400px] mx-auto mt-50 border-white shadow-2xl bg-white rounded py-15 px-6 md:px-[320]">
        {/* <div className="flex items-center justify-center">
          <RiUser3Line size={40} />
        </div> */}
        <h1 className="font-bold text-3xl mb-6 mt-6 text-center">
          Create New Password
        </h1>
        <p className="text-sm text-center">
          Please Enter your new password. Your new password must be different
          from your previous password.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            {error && <ErrorAlert error={error} />}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">New Password</legend>
              <input
                type="password"
                className="input"
                placeholder="Password"
                {...register("password")}
                id="password"
              />
            </fieldset>
            {errors.password?.message && (
              <span className="text-xs text-red-500">
                {errors.password?.message}
              </span>
            )}
          </div>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Confirm Password</legend>
              <input
                type="password"
                className="input"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
                id="confirmPassword"
              />
            </fieldset>
            {errors.confirmPassword?.message && (
              <span className="text-xs text-red-500">
                {errors.confirmPassword?.message}
              </span>
            )}
          </div>
          <button
            className="w-full btn text-white bg-blue-500 hover:bg-blue-700 cursor-pointer mt-4 mb-4 "
            type="submit"
            disabled={isSubmitting || mutation.isPending}
          >
            {isSubmitting || mutation.isPending
              ? "Resetting..."
              : "Create New Password"}
          </button>
        </form>
      </div>
    </>
  );
}

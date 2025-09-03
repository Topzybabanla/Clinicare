import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { forgotPasswordSchema } from "../../utils/dataSchema";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../../api/auth";
import ErrorAlert from "../../components/ErrorAlert";
import { toast } from "sonner";

export default function ForgotPassword() {
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const mutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (response) => {
      
      toast.success(response?.data?.message || "Password reset link sent");
    },
    onError: (error) => {
      import.meta.env.DEV && console.log(error);
      setError(
        error?.response?.data?.message || "Failed to send password link"
      );
    },
  });

  const onsubmit = async (data) => {
    
    mutation.mutate(data);
  };

  return (
    <>
      <div className="w-full max-w-[400px] mx-auto mt-15 border-white shadow-2xl bg-white rounded py-15 px-6 md:px-[320]">
        {/* <div className="flex items-center justify-center">
          <RiUser3Line size={40} />
        </div> */}
        <h1 className="font-bold text-3xl mb-6 mt-6 text-center">
          Forgot Password
        </h1>
        <p className="text-sm text-center">
          Enter your email address and we'll send you a code to reset your
          password.
        </p>
        {error && <ErrorAlert error={error}/>}
        <form onSubmit={handleSubmit(onsubmit)}>
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
          <button
            className="w-full btn text-white bg-blue-500 hover:bg-blue-700 cursor-pointer mt-4 mb-4 "
            type="submit"
            disabled={isSubmitting || mutation.isPending}
          >
            {isSubmitting || mutation.isPending ? "Resetting..." : "Send Link"}
          </button>
        </form>
      </div>
    </>
  );
}

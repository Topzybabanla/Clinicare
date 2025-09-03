import useMetaArgs from "../../../hooks/useMeta";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { updatePasswordSchema } from "../../../utils/dataSchema";
import { toast } from "sonner";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorAlert from "../../../components/ErrorAlert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../../store";
import { logout, updateUserPassword } from "../../../api/auth";

export default function Password() {
  useMetaArgs({
    title: "Password - Clinicare",
    description: "Password settings for your clinicare account.",
    keywords: "Clinicare, password, settings",
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isNewVisible, setIsNewVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [error, setError] = useState();
  const queryClient = useQueryClient();
  const { accessToken, setAccessToken } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(updatePasswordSchema),
  });
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: updateUserPassword,
    onSuccess: async (response) => {
      if (response.status === 200) {
        toast.success(response?.data?.message);
        // After password update, log the user out
        try {
          const res = await logout(accessToken);
          if (res.status === 200) {
            setAccessToken(null);
            queryClient.invalidateQueries({ queryKey: ["auth_user"] });
          }
        } catch {
          // fall back to local cleanup even if API logout fails
          queryClient.invalidateQueries({ queryKey: ["auth_user"] });
          setAccessToken(null);
          navigate("/account/signin");
        }
      }
    },
    onError: (error) => {
      import.meta.env.DEV && console.log(error);
      setError(error?.response?.data?.message || "Error updating password");
    },
  });

  const onSubmit = async (userData) => {
    mutation.mutate({ userData, accessToken });
  };

  return (
    <div className="space-y-6">
      <h1 className="font-bold text-2xl border-b">Update Password</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        id="/dashboard/settings/password"
        className="max-w-[400px] mx-auto"
      >
        {error && <ErrorAlert error={error} />}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Password</legend>
          <input
            type="password"
            className="border input"
            placeholder="Password"
            id="password"
            {...register("password")}
            errors={errors}
            name="password"
          />
        </fieldset>
        {errors.password?.message && (
          <span className="text-xs text-red-500">
            {errors.password?.message}
          </span>
        )}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">New Password</legend>
          <input
            type="password"
            className="border input"
            placeholder="New Password"
            id="newPassword"
            {...register("newPassword")}
          />
        </fieldset>
        {errors.password?.message && (
          <span className="text-xs text-red-500">
            {errors.password?.message}
          </span>
        )}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Confirm Password</legend>
          <input
            type="password"
            className="border input"
            placeholder="Password"
            id="confirmPassword"
            {...register("confirmPassword")}
          />
        </fieldset>
        {errors.password?.message && (
          <span className="text-xs text-red-500">
            {errors.password?.message}
          </span>
        )}
        <p className="my-2 text-gray-600 text-sm">
          Note: You will be logged out after updating your password.
        </p>
        <div className="my-6 flex md:hidden gap-4 justify-center">
          <button
            type="button"
            className="btn btn-outline w-[140px] border border-gray-300"
            onClick={() => navigate("/dashboard/settings")}
          >
            cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold border border-gray-300 p-2 rounded-md cursor-pointer w-[140px]"
            disabled={isSubmitting || mutation.isPending}
          >
            {isSubmitting || mutation.isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}

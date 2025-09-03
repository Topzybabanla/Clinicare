import React, { useEffect, useState } from "react";
import UploadImage from "../../../features/settings/UploadImage";
import Delete from "../../../features/settings/Delete";
import { useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { validateUserSchema } from "../../../utils/dataSchema";
import ErrorAlert from "../../../components/ErrorAlert";
import { useAuth } from "../../../store";
import { formatDate } from "../../../utils/constants";
import { updateUserProfile } from "../../../api/auth";
import { toast } from "sonner";

export default function Account() {
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    resolver: zodResolver(validateUserSchema),
  });

  const navigate = useNavigate();
  const { user, accessToken } = useAuth();
  const queryClient = useQueryClient();
  const location = useLocation();

  useEffect(() => {
    location.pathname === "/dashboard/settings" &&
      navigate("/dashboard/settings/account");
  }, [location.pathname, navigate]);

  useEffect(() => {
    if (user) {
      setValue("fullname", user?.fullname);
      setValue("email", user?.email);
      setValue("phone", user?.phone);
      setValue("dateOfBirth", formatDate(user?.dateOfBirth || "", "input"));
    }
  }, [user, setValue]);

  const mutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: async (response) => {
      if (response.status === 200) {
        toast.success(response?.data?.message);
        queryClient.invalidateQueries({ queryKey: ["auth_user"] });
      }
    },
    onError: (error) => {
      import.meta.env.DEV && console.log(error);
      setError(error?.response?.data?.message || "Error updating your profile");
    },
  });

  const onFormSubmit = async (userData) => {
    mutation.mutate({ userData, accessToken });
  };
  return (
    <div className="space-y-6">
      <h1 className="font-bold text-2xl border-b border-gray-300 pb-2">
        Account
      </h1>
      <div className="flex items-center gap-5">
        <div>
          <UploadImage />
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        id="/dashboard/settings/account"
      >
        {error && <ErrorAlert error={error} />}
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-12 md:col-span-6">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Full name</legend>
              <input
                type="text"
                className="border input w-full md:w-100"
                {...register("fullname")}
                id="fullName"
              />
            </fieldset>
            {errors.fullname?.message && (
              <span className="text-xs text-red-500">
                {errors.fullname?.message}
              </span>
            )}
          </div>
          <div className="col-span-12 md:col-span-6">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email</legend>
              <input
                type="Email"
                className="border input w-full"
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
          <div className="col-span-12 md:col-span-6">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Phone</legend>
              <input
                type="text"
                className="border input w-full md:w-100"
                {...register("phone")}
                id="phone"
              />
            </fieldset>
            {errors.phone?.message && (
              <span className="text-xs text-red-500">
                {errors.phone?.message}
              </span>
            )}
          </div>
          <div className="col-span-12 md:col-span-6">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Date of birth</legend>
              <input
                type="date"
                className="border input w-full"
                {...register("dateOfBirth")}
                id="dateOfBirth"
              />
            </fieldset>
            {errors.dateOfBirth?.message && (
              <span className="text-xs text-red-500">
                {errors.dateOfBirth?.message}
              </span>
            )}
          </div>
        </div>
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
      <hr />
      <div>
        <h1 className="font-bold ">Delete account</h1>
        <div className="md:flex justify-between gap-5 items-center ">
          <p className="md:w-110 mb-5 md:mb-0">
            When you delete your account, you lose access to mdeical history and
            appointments. We permanently delete your account and all associated
            data.
          </p>
          {/* <button className="btn">Delete Account</button> */}
          <Delete />
        </div>
      </div>
    </div>
  );
}

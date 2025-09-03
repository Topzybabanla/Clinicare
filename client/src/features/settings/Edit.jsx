import ErrorAlert from "@/components/errorAlert";
import Modal from "@/components/Modal";
import { validateSignUpSchema } from "@/utils/dataSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserRole } from "../../api/auth";

export default function Edit({ item }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(validateSignUpSchema) });

  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [success, ShowSuccess] = useState(false);
  const [msg, setMsg] = useState("");
  const [showDoctor, setShowDoctor] = useState(false);
  const availability = ["available", "unavailable", "on leave", "sick"];
  const specialization = [
    "Cardiology",
    "Dermatology",
    "Gastroenterology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Psychiatry",
    "Urology",
  ];

  const fieldWatch = watch("role");
  useEffect(() => {
    if (fieldWatch === "doctor") {
      setShowDoctor(true);
    } else {
      setShowDoctor(false);
    }
  }, [fieldWatch]);

  const { accessToken } = useAuth;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateUserRole,
    onSuccess: (response) => {
      if (response.success) {
        setMsg(response?.message);
        ShowSuccess(true);
      }
    },
    onError: (error) => {
      console.error(error);
      setError(error?.response?.data?.message || "Error updating user role");
    },
  });

  useEffect(() => {
    if (item) {
      setValue("role", item?.role);
    }
  }, [item, setValue]);

  const role = ["admin", "staff", "doctor", "nurse", "patient"];

  const onSubmit = async (role) => {
    mutation.mutate({ userId: item._id, role, accessToken });
  };

  const handleClose = async () => {
    await queryClient.invalidateQueries({ queryKey: ["getAllUsers"] });
    setIsOpen(false);
  };

  return (
    <>
      <button
        className="btn btn-outline w-[80px]"
        onClick={() => setIsOpen(true)}
        disabled={item.role === "patient"}
      >
        Edit
      </button>
      <Modal
        id="addUserModal"
        isOpen={isOpen}
        className="bg-white p-4 rounded-xl shadow w-[90%] max-w-[400px] mx-auto"
      >
        {error && <ErrorAlert error={error} />}
        {success ? (
          <>
            <div className="p-4 text-center">
              <img
                src="/Success.svg"
                alt="success"
                className="w-full h-[200px]"
              />
              <h1 className="text-2xl font-bold">Congratulations!</h1>
              <p className="text-gray-600">{msg}</p>
              <button
                className="btn my-4 bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
                size="lg"
                onClick={handleClose}
              >
                Continue to Users
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-2 w-full">
            <h1 className="text-2xl font-bold">Update User data</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-12">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Role</legend>
                    <select
                      name="role"
                      id=""
                      defaultValue={""}
                      className="select capitalize cursor-pointer w-full"
                      {...register("role")}
                      disabled={isSubmitting}
                    >
                      <option value="">Select Role</option>
                      {role
                        ?.filter((role) => role !== "patient")
                        ?.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                    </select>
                  </fieldset>
                </div>
                {showDoctor && (
                  <>
                    <div className="col-span-12 md:col-span-6">
                      <label className="block text-sm font-medium text-gray-700">
                        Specialization
                      </label>
                      <select
                        defaultValue=""
                        className="select capitalize w-full"
                        {...register("specialization")}
                        disabled={isSubmitting}
                      >
                        <option value="">Select Specialization</option>
                        {specialization?.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {errors.specialization?.message && (
                        <span className="text-xs text-red-500">
                          {errors.specialization?.message}
                        </span>
                      )}
                    </div>

                    <div className="col-span-12 md:col-span-6">
                      <label className="block text-sm font-medium text-gray-700">
                        Availability
                      </label>
                      <select
                        defaultValue=""
                        className="select capitalize w-full"
                        {...register("availability")}
                        disabled={isSubmitting}
                      >
                        <option value="">Select Availability</option>
                        {availability?.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {errors.availability?.message && (
                        <span className="text-xs text-red-500">
                          {errors.availability?.message}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>

              <div className="mt-4 mb-2 flex md:ml-38 md:justify-right gap-3">
                <button
                  type="button"
                  className="btn btn-outline w-[150px] border-[0.2px] border-gray-500"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn bg-blue-500 hover:bg-blue-600 text-white w-[150px]"
                  disabled={isSubmitting}
                  // onClick={onDelete}
                >
                  {isSubmitting ? "Updating..." : "Update User"}
                  {/* {mutation.isPending ? "Adding..." : "Add User"} */}
                  {/* Add User */}
                </button>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </>
  );
}

{
  /* <div className="col-span-12 md:col-span-6">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Full name</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Full name"
                  {...register("fullname")}
                />
              </fieldset>
              {errors.fullname?.message && (
                <span className="text-xs text-red-500">
                  {errors.fullname?.message}
                </span>
              )}
            </div> */
}

{
  /* <div className="col-span-12 md:col-span-6">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Email</legend>
                <input
                  type="email"
                  className="input"
                  placeholder="Email"
                  {...register("email")}
                />
              </fieldset>
              {errors.email?.message && (
                <span className="text-xs text-red-500">
                  {errors.email?.message}
                </span>
              )}
            </div> */
}

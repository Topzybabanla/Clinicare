import Modal from "../../components/Modal";
import { useState } from "react";
import { RiDeleteBin2Line } from "@remixicon/react";
import { deleteAccount } from "../../api/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuth } from "../../store";
import ErrorAlert from "../../components/ErrorAlert";

export default function Delete() {
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const { accessToken, setAccessToken } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteAccount,
    onSuccess: async (response) => {
      if (response.status === 200) {
        toast.success(response?.data?.message);
        //clears all cacched keys from tanstack query
        queryClient.clear();
        setAccessToken(null);
      }
    },
    onError: (error) => {
      import.meta.env.DEV && console.log(error);
      setError(error?.response?.data?.message || "Error deleting your account");
    },
  });

  const onDelete = async () => {
    mutation.mutate(accessToken);
  };
  return (
    <>
      <button
        className="btn btn-outline bg-red-500 hover:bg-red-600 text-white"
        onClick={() => setIsOpen(true)}
      >
        <RiDeleteBin2Line />
        Delete Account
      </button>
      <Modal
        id="deleteModal"
        classname="bg-white p-4 rounded-xl shadow w-[90%] max-w-[400px] mx-auto"
        isOpen={isOpen}
      >
        <div className="flex flex-col items-center gap-2 w-full">
          <h1 className="text-2xl font-bold">Delete</h1>
          <p className="text-center">
            Are you sure you want to delete your account?
          </p>
          {error && <ErrorAlert error={error} />}
          <div className="mt-4 mb-2 flex gap-2">
            <button
              type="button"
              className="btn btn-outline w-[150px] border-[0.2px] border-gray-500"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              className="btn bg-red-500 hover:bg-red-600 text-white w-full md:w-[150px]"
              type="button"
              disabled={mutation.isPending}
              onClick={onDelete}
            >
              {mutation.isPending ? "Deleting..." : "Yes, Delete"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

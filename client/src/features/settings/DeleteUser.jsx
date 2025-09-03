import Modal from "../../components/Modal";
import { useState } from "react";
import { RiDeleteBin2Line } from "@remixicon/react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuth } from "../../store";
import ErrorAlert from "../../components/ErrorAlert";
import { deleteAccountAdmins } from "../../api/auth";

export default function DeleteUser({ item }) {
  const [error, setError] = useState(null);
  const [success, showSuccess] = useState(false);
  const [msg, setMsg] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { accessToken } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteAccountAdmins,
    onSuccess: (response) => {
      if (response.status === 200) {
        setMsg(response?.data?.data?.message);
        showSuccess(true);
        queryClient.invalidateQueries({ queryKey: ["getAllUsers"] });
      }
    },
    onError: (error) => {
      console.error(error);
      setError(error?.response?.data?.message || "Error deleting user");
    },
  });  

  const onDelete = async () => {
    mutation.mutate({ userId: item._id, accessToken });
  };
  return (
    <>
      <div>
        <button
          className="btn btn-outline bg-red-500 hover:bg-red-600 text-white md:w-[80px] w-full"
          onClick={() => setIsOpen(true)}
        >
    
          Delete
        </button>
      </div>
      <Modal
        id="deleteModal"
        classname="bg-white p-4 rounded-xl shadow w-[90%] max-w-[400px] mx-auto"
        isOpen={isOpen}
      >
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
                onClick={() => setIsOpen(false)}
              >
                Continue to Users
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 w-full">
            <h1 className="text-2xl font-bold">Confirm Delete</h1>
            <p className="text-center">
              Are you sure you want to delete <b>{item?.fullname}</b> account?
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
                // disabled={mutation.isPending}
                onClick={onDelete}
              >
                {mutation.isPending ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

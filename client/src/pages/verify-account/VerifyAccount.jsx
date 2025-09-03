import useMetaArgs from "@/hooks/useMeta";
import { RiMailFill } from "@remixicon/react";
import React, { useEffect, useState } from "react";
import PinField from "react-pin-field";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { verifyAccount, resendVerificationCode } from "../../api/auth";
import ErrorAlert from "../../components/ErrorAlert";
import { toast } from "sonner";
import { useAuth } from "../../store";
import { useNavigate } from "react-router";

export default function VerifyAccount() {
  useMetaArgs({
    title: "Verify Account - Clinicare",
    description: "Verify Your Clinicare account",
    keywords: "Clinicare, verify account, verification, account",
  });

  const [verificationToken, setVerificationToken] = useState("");
  //since we are not using the useForm, we are going to validate manually, using React-Pin-Field for the verification input.
  // const [isSubmitting, setIsSubmitting] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { accessToken, user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const TIMER_STORAGE_KEY = "verification_timer_end";

  useEffect(() => {
    const savedEndTime = localStorage.getItem(TIMER_STORAGE_KEY);
    if (savedEndTime) {
      const endTime = parseInt(savedEndTime, 10);
      const now = Math.floor(Date.now() / 1000);
      const remaining = Math.max(0, endTime - now);

      if (remaining > 0) {
        setTimer(remaining);
        setIsResendDisabled(true);
      } else {
        localStorage.removeItem(TIMER_STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    let interval;
    // Stop the timer if verification was successful
    if (timer > 0) {
      setIsResendDisabled(true);
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1 && interval !== null) {
            setIsResendDisabled(false);
            clearInterval(interval);
            localStorage.removeItem(TIMER_STORAGE_KEY);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval !== null) {
        clearInterval(interval);
      }
    };
  }, [timer]);

  const mutation = useMutation({
    mutationFn: verifyAccount,
    onSuccess: (response) => {
      toast.success(response?.data?.message || "Account verified");

      // clear old userdata and refetch
      queryClient.invalidateQueries({ queryKey: ["auth_user"] });
      // navigate("/dashboard", { replace: true });
      setSuccess(true);
    },
    onError: (error) => {
      import.meta.env.DEV && console.log(error);
      setError(error?.response?.data?.message || "Account verification failed");
    },
  });

  const sendResendToken = useMutation({
    mutationFn: resendVerificationCode,
    onSuccess: (response) => {
      toast.success(response?.data?.message || "Verification token sent");
    },
    onError: (error) => {
      import.meta.env.DEV && console.log(error);
      setError(error?.response?.data?.message || "Verification code failed");
    },
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    mutation.mutate({ verificationToken, accessToken });
  };

  const redirect = () => {
    if (user?.role === "patient") {
      navigate("/patients-onboard");
    }
    navigate("/dashboard");
  };
  const handleResendCode = async (e) => {
    e.preventDefault();
    const newTimer = 50;
    setTimer(newTimer);
    const endTime = Math.floor(Date.now() / 1000) + newTimer;
    localStorage.setItem(TIMER_STORAGE_KEY, endTime.toString());
    if (!accessToken) {
      toast.error("Session expired. Please refresh the page and try again.");
      return;
    }
    sendResendToken.mutate(accessToken);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] container mx-auto flex justify-center pt-20 items-center">
      {success || user?.isVerified ? (
        <>
          {" "}
          <div className="p-4 max-w-[800px] mx-auto text-center">
            <img src="/Success.svg" alt="success" className="w-full h-full" />
            <h1 className="text-2xl font-bold">Congratulations!</h1>
            <p className="text-gray-600">
              Your account has been verified successfully
            </p>
            <button
              className="btn my-4 bg-blue-500 hover:bg-blue-600  text-white cursor-pointer"
              size="lg"
              onClick={redirect}
            >
              Continue
            </button>
          </div>
        </>
      ) : (
        <div className="px-4 md:px-0 bg-white rounded-xl shadow w-full max-w-[400px]">
          <form
            className="bg-white px-5 py-4 flex flex-col justify-center rounded-xl shadow-sm max-w-[400px]"
            onSubmit={onSubmit}
          >
            <RiMailFill
              className="mx-auto border rounded-full p-2 border-blue-500 text-blue-500 shadow-lg"
              size={36}
            />
            <h1 className="font-bold text-2xl text-center py-2">
              OTP Verification
            </h1>
            <p className="text-center text-[14px] md:text-[15px] text-gray-600 ">
              We have sent a verification code to your email. <br /> Please
              enter it below.
            </p>

            <div className="py-5 w-full text-center md:w-[350px]">
              {error && <ErrorAlert error={error} />}
              <PinField
                length={6}
                autoComplete="one-time-code"
                autoCorrect="off"
                dir="ltr"
                pattern="[0-9]"
                type="text"
                value={verificationToken}
                onChange={(value) => {
                  setVerificationToken(value);
                }}
                className="w-[50px] sm:w-[58px] text-center border border-gray-300 rounded-md p-2 font-bold my-2"
              />
            </div>
            <button
              type="submit"
              className="btn bg-blue-500 hover:bg-blue-600 rounded-sm text-white w-full md:w-[350px]"
              disabled={verificationToken.length !== 6 || mutation.isPending}
            >
              {mutation.isPending ? "Verifying..." : "Verify"}
            </button>
            <div className=" flex flex-col items-center pt-3">
              <p className="text-[14px] text-gray-500">
                Did not receive a code? or code expired
              </p>
              <button
                className=" btn bg-blue-500 mt-1 hover:bg-blue-600 text-white font-bold rounded-sm"
                onClick={handleResendCode}
                disabled={isResendDisabled}
              >
                {isResendDisabled ? `Resend in ${timer}s` : "Resend Code"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

import { AuthContext } from ".";
import { useState, useEffect } from "react";
import { getAuthenticatedUser, refreshAccessToken } from "../api/auth";
import { useQuery } from "@tanstack/react-query";
import { LazyLoader } from "../components/LazyLoader";

export default function Authprovider({ children }) {
  // set and save accessToken in state memory
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null); //default value of logged in user
  // const [isAuthenticating, setIsAuthenticating] = useState(false);

  // query to refresh accessToken on app start
  useQuery({
    queryKey: ["refresh_token"],
    queryFn: async () => {
      // setIsAuthenticating(true);
      const res = await refreshAccessToken();
      // make api call to get new accessToken, then update it in our own accessToken state using the
      if (res.status === 200) {
        const newAccessToken = res.data?.data?.accessToken;
        setAccessToken(newAccessToken);
        // setIsAuthenticating(false);
        return res;
      } else {
        setAccessToken(null);
        // setIsAuthenticating(false);
        //if res.status is not 200, remove the accessToken and force logout
        return null;
      }
    },
    onError: async (error) => {
      console.error("Error refreshing token", error);
      setAccessToken(null);
    },
    enabled: !accessToken, //ensure it runs only when we don't have accessToken
    retry: false, //don't run again if the queryFn fails
  });

  // Fetch auth user

  const { isPending, data } = useQuery({
    queryKey: ["auth_user", accessToken],
    queryFn: () => getAuthenticatedUser(accessToken),
    onError: async (error) => {
      console.error("Error fetching user", error);
    },
    enabled: !!accessToken,
  });

  useEffect(() => {
    if (data?.status === 200) {
      setUser(data?.data?.data);
    }
  }, [data?.data?.data, data?.status]);
  // useQuery({
  //   queryKey: ["auth_user"], //cache key for our api call
  //   queryFn: async () => {
  //     setIsAuthenticating(true);
  //     const res = await getAuthenticatedUser(accessToken);
  //     if (res.status === 200) {
  //       setUser(res.data?.data); //hold the value from our res in user state
  //       setIsAuthenticating(false);
  //       return res;
  //     }
  //     setIsAuthenticating(false);
  //     return null;
  //   },
  //   onError: (error) => {
  //     console.error("Error fetching user", error);
  //   },
  //   enabled: !!accessToken, //run only when we have the accessToken
  // });

  

  if (isPending && accessToken) {
    return <LazyLoader />;
  }

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, user }}>
      {children}
    </AuthContext.Provider>
  );
}

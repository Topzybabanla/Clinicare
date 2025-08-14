import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "sonner";
import Authprovider from "./store/AuthProvider";

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <QueryClientProvider client={queryClient}>
        <Authprovider>
          <AppRoutes />
        </Authprovider>
      </QueryClientProvider>
    </>
  );
}

export default App;

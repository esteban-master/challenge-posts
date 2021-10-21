import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { PostsPage } from "./pages/Posts";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <ReactQueryDevtools initialIsOpen={false} />
      <div className="container mx-auto py-5">
        <h1 className="text-4xl font-bold">App React Con Redux - TCIT</h1>
        <PostsPage />
      </div>
    </QueryClientProvider>
  );
}

export default App;

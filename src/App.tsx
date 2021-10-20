import "react-toastify/dist/ReactToastify.css";

import { PostsPage } from "./pages/Posts";

function App() {
  return (
    <div className="container mx-auto py-5">
      <h1 className="text-4xl">App React Con Redux - TCIT</h1>
      <PostsPage />
    </div>
  );
}

export default App;

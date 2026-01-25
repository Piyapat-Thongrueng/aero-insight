import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ViewPostPage from "./pages/ViewPostPage";
import { Toaster } from "sonner";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/post/:postId" element={<ViewPostPage />} />
        </Routes>
        <Toaster position="top-center" richColors/>
      </BrowserRouter>
    </>
  );
}

export default App;

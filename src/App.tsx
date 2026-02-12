import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ViewPostPage from "./pages/ViewPostPage";
import { Toaster } from "sonner";
import NotFoundPage from "./pages/NotFoundPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import MemberPage from "./pages/MemberPage";

// Admin Layout & Pages
import AdminLayout from "./components/admin/layout/AdminLayout";
import ArticleManagementPage from "./pages/admin/ArticleManagementPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/post/:postId" element={<ViewPostPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/members" element={<MemberPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/articles" replace />} />
            <Route path="articles" element={<ArticleManagementPage />} />
          </Route>

          {/* 404 NOT FOUND Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster position="top-center" richColors />
      </BrowserRouter>
    </>
  );
}

export default App;

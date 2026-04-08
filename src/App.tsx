import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ViewPostPage from "./pages/ViewPostPage";
import { Toaster } from "sonner";
import NotFoundPage from "./pages/NotFoundPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SignUpSuccessPage from "./pages/SignUpSuccessPage";
import AdminLayout from "./components/admin/layout/AdminLayout";
import ArticleManagementPage from "./pages/admin/ArticleManagementPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import jwtInterceptor from "./utils/jwtIntercepter";
import { useAuth } from "./contexts/authentication";
import AuthenticationRoute from "./components/auth/authenticationRoute";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./components/auth/ProtectedRoute";

jwtInterceptor();

function App() {
  const { isAuthenticated, state } = useAuth();

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/post/:postId" element={<ViewPostPage />} />
        <Route path="*" element={<NotFoundPage />} />

        {/* Authentication Section */}
        <Route
          path="/signup"
          element={
            <AuthenticationRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
              userRole={state.user?.role ?? null}
            >
              <SignUpPage />
            </AuthenticationRoute>
          }
        />
        <Route
          path="/login"
          element={
            <AuthenticationRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
              userRole={state.user?.role ?? null}
            >
              <LoginPage />
            </AuthenticationRoute>
          }
        />
        <Route
          path="/sign-up/success"
          element={
            <AuthenticationRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
              userRole={state.user?.role ?? null}
            >
              <SignUpSuccessPage />
            </AuthenticationRoute>
          }
        />

        {/* User Routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
              userRole={state.user?.role ?? null}
              requiredRole="user"
            >
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/login"
          element={
            <AuthenticationRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
              userRole={state.user?.role ?? null}
            >
              <AdminLoginPage />
            </AuthenticationRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
              userRole={state.user?.role ?? null}
              requiredRole="admin"
              redirectTo="/admin/login"
            >
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/articles" replace />} />
          <Route path="articles" element={<ArticleManagementPage />} />
        </Route>

        {/* 404 NOT FOUND Route */}
      </Routes>
      <Toaster position="top-center" richColors />
    </>
  );
}

export default App;

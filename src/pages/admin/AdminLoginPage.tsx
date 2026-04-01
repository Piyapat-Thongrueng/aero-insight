import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { X, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/authentication";
import LoadingScreen from "@/components/common/LoadingScreen";

interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginFormErrors {
  [key: string]: string;
}

const AdminLoginPage = () => {
  const { adminLogin, state, isAuthenticated } = useAuth();

  const [formValues, setFormValues] = useState<LoginFormValues>({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<LoginFormErrors>({});

  // ถ้ากำลังโหลดสถานะผู้ใช้ แสดง loading screen
  if (state.getUserLoading === null || state.getUserLoading) {
    return <LoadingScreen />;
  }

  // ถ้า login เป็น admin อยู่แล้ว redirect ไปที่ admin dashboard
  if (isAuthenticated && state.user?.role === "admin") {
    return <Navigate to="/admin/articles" replace />;
  }

  const validateInputs = (): LoginFormErrors => {
    const errors: LoginFormErrors = {};

    if (!formValues.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!formValues.password.trim()) {
      errors.password = "Password is required.";
    }

    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateInputs();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    const result = await adminLogin(formValues);
    if (result?.error) {
      toast.custom((t) => (
        <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">{result.error}</h2>
            <p className="text-sm">Please check your credentials and try again.</p>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      ));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-8 py-10">
          {/* Heading */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
            <p className="text-gray-500 text-sm mt-1">Sign in to access the admin dashboard</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 text-sm font-medium">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="admin@example.com"
                value={formValues.email}
                onChange={handleChange}
                className={`border border-gray-300 focus:border-gray-500 rounded-lg px-4 py-5 text-gray-800 placeholder:text-gray-400 ${
                  formErrors.email ? "border-red-500" : ""
                }`}
                disabled={state.loading ?? false}
              />
              {formErrors.email && (
                <p className="text-red-500 text-sm">{formErrors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 text-sm font-medium">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={formValues.password}
                onChange={handleChange}
                className={`border border-gray-300 focus:border-gray-500 rounded-lg px-4 py-5 text-gray-800 placeholder:text-gray-400 ${
                  formErrors.password ? "border-red-500" : ""
                }`}
                disabled={state.loading ?? false}
              />
              {formErrors.password && (
                <p className="text-red-500 text-sm">{formErrors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full rounded-lg py-5 text-sm font-medium mt-2"
              disabled={state.loading ?? false}
            >
              {state.loading ? (
                <Loader2 className="animate-spin mr-2" size={16} />
              ) : null}
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;

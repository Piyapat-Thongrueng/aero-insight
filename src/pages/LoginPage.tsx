import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { X, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/authentication";

interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginFormErrors {
  [key: string]: string;
}

const LoginPage = () => {
  // Hooks and State Declarations
  const { login, state } = useAuth();
  const navigate = useNavigate();

  // Form State
  const [formValues, setFormValues] = useState<LoginFormValues>({
    email: "",
    password: "",
  });
  // Form Errors State
  const [formErrors, setFormErrors] = useState<LoginFormErrors>({});

  // Input Validation Function
  const validateInputs = (): LoginFormErrors => {
    const errors: LoginFormErrors = {};

    // Validate email
    if (!formValues.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      errors.email = "Please enter a valid email address.";
    }

    // Validate password
    if (!formValues.password.trim()) {
      errors.password = "Password is required.";
    }

    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value }: { name: string; value: string } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Form Submission Handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateInputs();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    if (Object.keys(errors).length === 0) {
      const result = await login(formValues);
      if (result?.error) {
        return toast.custom((t) => (
          <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
            <div>
              <h2 className="font-bold text-lg mb-1">{result.error}</h2>
              <p className="text-sm">Please try another password or email</p>
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
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <Navbar />
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 md:py-12">
        <div className="w-full max-w-xl">
          {/* Form Container */}
          <div className="bg-brown-100 rounded-3xl px-6 py-8 md:px-10 md:py-12">
            {/* Heading */}
            <h1 className="text-3xl md:text-4xl font-bold text-brown-600 text-center mb-8">
              Log in
            </h1>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-brown-500 text-sm font-normal"
                >
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={formValues.email}
                  onChange={handleChange}
                  className={`bg-white border border-brown-300 focus:border-brown-600 focus:ring-brown-600 rounded-lg px-4 py-5 text-brown-600 placeholder:text-brown-400 ${formErrors.email ? "border-red-500" : ""}`}
                  disabled={state.loading ?? false}
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-brown-500 text-sm font-normal"
                >
                  Password
                </Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={formValues.password}
                  onChange={handleChange}
                  className={`bg-white border border-brown-300 focus:border-brown-600 focus:ring-brown-600 rounded-lg px-4 py-5 text-brown-600 placeholder:text-brown-400 ${formErrors.password ? "border-red-500" : ""}`}
                  disabled={state.loading ?? false}
                />
                {formErrors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.password}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full rounded-full py-6 text-base transition-colors duration-300 shadow-md hover:shadow-lg mt-8"
                disabled={state.loading ?? false}
              >
                {state.loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  ""
                )}
                Log in
              </Button>
            </form>

            {/* Sign Up Link */}
            <p className="text-center text-brown-500 text-sm mt-6">
              Don't have any account?{" "}
              <a
                onClick={() => navigate("/signup")}
                className="text-brown-600 font-semibold hover:underline cursor-pointer"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LoginPage;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from "@/contexts/authentication";
import { Loader2, X } from "lucide-react";

interface SignUpFormValues {
  name: string;
  username: string;
  email: string;
  password: string;
}

interface SignUpFormErrors {
  [key: string]: string;
}

const SignUpPage = () => {
  const { register, state } = useAuth();
  const navigate = useNavigate();
  // ชั้นตอนที่ 1: Stateสำหรับการจัดการฟอร์มที่จะเก็บข้อมูลผู้ใช้สำหรับการสมัคร
  const [formValues, setFormValues] = useState<SignUpFormValues>({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  // ขั้นตอนที่ 2: Stateสำหรับการจัดการข้อผิดพลาดในการตรวจสอบข้อมูลฟอร์ม
  const [formErrors, setFormErrors] = useState<SignUpFormErrors>({});

  // ขั้นตอนที่ 3: Validate function สำหรับตรวจสอบความถูกต้องของข้อมูลฟอร์มที่ user กรอกเข้ามา
  // โดยจะคืนค่าเป็น object ที่มีข้อผิดพลาด (ถ้ามี) แล้วนำไปใช้ในการแสดงผลข้อผิดพลาดในฟอร์มแต่ละช่องinput
  const validateInputs = (): SignUpFormErrors => {
    const errors: SignUpFormErrors = {};

    // ตรวจสอบชื่อ (name field)
    if (!formValues.name.trim()) {
      errors.name = "Name is required";
    } else if (formValues.name.trim().length < 3) {
      errors.name = "Name must be at least 3 characters";
    } else if (!/^[a-zA-Z\s]+$/.test(formValues.name)) {
      errors.name = "Name can only contain letters and spaces";
    }

    // ตรวจสอบชื่อผู้ใช้ (username field)
    if (!formValues.username.trim()) {
      errors.username = "Username is required.";
    } else if (!/^[a-zA-Z0-9._-]+$/.test(formValues.username)) {
      errors.username =
        "Username can only contain letters, numbers, dots, underscores, and dashes.";
    } else if (formValues.username.length < 5) {
      errors.username = "Username must be at least 5 characters long.";
    } else if (formValues.username.length > 15) {
      errors.username = "Username cannot exceed 15 characters.";
    }

    // ตรวจสอบอีเมล (email field)
    if (!formValues.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      errors.email = "Please enter a valid email address.";
    }

    // ตรวจสอบรหัสผ่าน (password field)
    if (!formValues.password.trim()) {
      errors.password = "Password is required.";
    } else if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(formValues.password)) {
      errors.password = "Password must contain letters and numbers.";
    } else if (formValues.password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    }

    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form
    const errors = validateInputs();
    setFormErrors(errors);

    // If there are validation errors, stop submission
    if (Object.keys(errors).length > 0) {
      return;
    }

    // Call register API
    const result = await register(formValues);
    if (result?.error) {
      // ✅ Type the toast parameter
      toast.custom((t: string | number) => (
        <div className="bg-red-500 text-white p-4 rounded-lg shadow-lg flex justify-between items-start max-w-md">
          <div className="flex-1">
            <h2 className="font-bold text-lg mb-1">Registration Failed</h2>
            <p className="text-sm">{result.error}</p>

            {/* ✅ Improved suggestion logic */}
            {result.error?.toLowerCase().includes("email") && (
              <p className="text-sm mt-2 opacity-90">
                💡 Try using a different email address.
              </p>
            )}
            {result.error?.toLowerCase().includes("username") && (
              <p className="text-sm mt-2 opacity-90">
                💡 Try using a different username.
              </p>
            )}
          </div>

          <button
            onClick={() => toast.dismiss(t)}
            className="text-white hover:text-gray-200 ml-4 shrink-0"
            aria-label="Dismiss"
          >
            <X size={20} />
          </button>
        </div>
      ));
    }
  };

  return (
    <section className="w-full min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <Navbar />
      {/* Main Content */}
      <main className="flex items-center justify-center px-4 py-10 md:py-14">
        <div className="w-full max-w-2xl">
          {/* Form Container */}
          <div className="bg-brown-100 rounded-3xl px-6 py-8 md:px-10 md:py-12">
            {/* Heading */}
            <h1 className="text-headline-2 text-brown-600 text-center mb-8">
              Sign Up
            </h1>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-body-2 text-brown-400">
                  Name
                </Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Full name"
                  value={formValues.name}
                  onChange={handleChange}
                  disabled={state.loading ?? false}
                  className={`bg-white border border-brown-300 focus:border-brown-600 focus:ring-brown-600 rounded-lg px-4 py-5 text-brown-600 placeholder:text-brown-400 ${formErrors.name ? "border-red-500" : ""}`}
                />
                {formErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                )}
              </div>

              {/* Username Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="username"
                  className="text-body-2 text-brown-400"
                >
                  Username
                </Label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  value={formValues.username}
                  onChange={handleChange}
                  className={`bg-white border border-brown-300 focus:border-brown-600 focus:ring-brown-600 rounded-lg px-4 py-5 text-brown-600 placeholder:text-brown-400 ${formErrors.username ? "border-red-500" : ""}`}
                  disabled={state.loading ?? false}
                />
                {formErrors.username && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.username}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-body-2 text-brown-400">
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
                  className="text-body-2 text-brown-400"
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
                Sign up
              </Button>
            </form>

            {/* Login Link */}
            <p className="text-center text-brown-500 text-sm mt-6">
              Already have an account?{" "}
              <a
                onClick={() => navigate("/login")}
                className="text-brown-600 font-semibold hover:underline cursor-pointer"
              >
                Log in
              </a>
            </p>
          </div>
        </div>
      </main>
    </section>
  );
};

export default SignUpPage;

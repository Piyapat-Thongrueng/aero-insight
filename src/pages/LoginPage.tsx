import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { X, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/Authentication";

interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginFormErrors {
  [key: string]: string;
}

const LoginPage = () => {
  // ขั้นตอนที่ 1: เรียกใช้ useAuth เพื่อเข้าถึงฟังก์ชัน login และสถานะการโหลดจาก context
  const { login, state } = useAuth();
  const navigate = useNavigate();

  // ขั้นตอนที่ 2: กำหนดสถานะของฟอร์ม
  const [formValues, setFormValues] = useState<LoginFormValues>({
    email: "",
    password: "",
  });
  // ขั้นตอนที่ 3: กำหนดสถานะของข้อผิดพลาดในฟอร์ม
  const [formErrors, setFormErrors] = useState<LoginFormErrors>({});

  // ขั้นตอนที่ 4: ฟังก์ชันตรวจสอบความถูกต้องของข้อมูลในฟอร์ม
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

  // ขั้นตอนที่ 5: ฟังก์ชันจัดการการส่งฟอร์ม
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // เรียกใช้ฟังก์ชัน validateInputs เพื่อตรวจสอบความถูกต้องของข้อมูลในฟอร์มแล้วเก็บข้อผิดพลาดในสถานะ formErrors
    const errors = validateInputs();
    // ถ้ามีข้อผิดพลาดใด ๆ ให้แสดงข้อผิดพลาดและหยุดการส่งฟอร์ม
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    // ถ้าไม่มีข้อผิดพลาด ให้เรียกใช้ฟังก์ชัน login จาก context เพื่อทำการเข้าสู่ระบบ
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

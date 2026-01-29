// src/pages/LoginPage.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login submitted:", formData);
    // TODO: เรียก API สำหรับ login
    // navigate("/");
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
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-white border border-brown-300 focus:border-brown-600 focus:ring-brown-600 rounded-lg px-4 py-5 text-brown-600 placeholder:text-brown-400"
                />
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
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="bg-white border border-brown-300 focus:border-brown-600 focus:ring-brown-600 rounded-lg px-4 py-5 text-brown-600 placeholder:text-brown-400"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full rounded-full py-6 text-base transition-colors duration-300 shadow-md hover:shadow-lg mt-8"
              >
                Log in
              </Button>
            </form>

            {/* Sign Up Link */}
            <p className="text-center text-brown-500 text-sm mt-6">
              Don't have any account?{" "}
              <Link
                to="/signup"
                className="text-brown-600 font-semibold hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;

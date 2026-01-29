import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
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
    console.log("Form submitted:", formData);
    // TODO: เรียก API สำหรับสร้าง account
    // navigate("/");
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
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-white border border-brown-300 focus:border-brown-600 focus:ring-brown-600 rounded-lg px-4 py-5 text-brown-600 placeholder:text-brown-400"
                />
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
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="bg-white border border-brown-300 focus:border-brown-600 focus:ring-brown-600 rounded-lg px-4 py-5 text-brown-600 placeholder:text-brown-400"
                />
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
                  className="text-body-2 text-brown-400"
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
                Sign up
              </Button>
            </form>

            {/* Login Link */}
            <p className="text-center text-brown-500 text-sm mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-brown-600 font-semibold hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </main>
    </section>
  );
};

export default SignUpPage;

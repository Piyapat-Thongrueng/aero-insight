import Navbar from "@/components/layout/Navbar";
import { UserRound } from "lucide-react";
import { RotateCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Footer from "@/components/layout/Footer";

const MemberPage = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      <Navbar />
      <div className="flex flex-col md:grid md:grid-cols-12 md:gap-0">
        {/* profile & reset-password */}
        <section className="flex flex-wrap px-5 py-5 gap-6 md:flex-col md:col-span-2 md:border-r md:border-brown-300">
          <div className="flex items-center gap-3">
            <UserRound className="text-gray-500" />
            <p className="text-body-1 text-brown-500">Profile</p>
          </div>
          <div className="flex items-center gap-3">
            <RotateCw className="text-gray-500" />
            <p className="text-body-1 text-brown-500">Reset password</p>
          </div>
        </section>
        <div className="md:col-span-10 flex flex-col">
          {/* header picture & username */}
          <section className="flex px-5 py-6 md:border-b md:border-brown-300 justify-between items-center">
            <div className="flex items-center gap-4 flex-wrap">
              <img
                src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"
                alt="moodengja"
                className="rounded-full w-10 h-10 shrink-0 object-cover"
              />
              <p className="text-headline-4 text-brown-400">Moodeng Ja</p>
              <p>|</p>
              <p className="text-headline-4">Profile</p>
            </div>
          </section>
          {/* update profile */}
          <section className="px-4 flex flex-col mb-10 md:flex-row md:bg-brown-100 md:mb-0">
            <main className="flex flex-col gap-5 py-8 bg-brown-100 rounded-xl md:w-full md:rounded-l-none">
              <div className="flex flex-col items-center justify-center gap-5">
                <img
                  src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"
                  alt="moodengja"
                  className="rounded-full w-30 h-30 shrink-0 object-cover"
                />
                <Button
                  type="button"
                  className="w-8/12 bg-green-500 hover:bg-green-600 text-white py-5 px-6 rounded-lg"
                >
                  Change Profile Picture
                </Button>
              </div>
              <form className="py-5 px-6 w-full">
                {/* name input */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name" className="text-body-1 text-brown-400">
                    Name
                  </Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Full name"
                    required
                    className="bg-white border border-brown-300 focus:border-brown-600 focus:ring-brown-600 rounded-lg px-4 py-6 text-brown-600 placeholder:text-brown-400 mt-2 mb-6 w-full"
                  />
                </div>
                {/* username input */}
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="username"
                    className="text-body-1 text-brown-400"
                  >
                    Username
                  </Label>
                  <Input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    required
                    className="bg-white border border-brown-300 focus:border-brown-600 focus:ring-brown-600 rounded-lg px-4 py-6 text-brown-600 placeholder:text-brown-400 mt-2 mb-6 w-full"
                  />
                </div>
                {/* email input */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email" className="text-body-1 text-brown-400">
                    Email
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email address"
                    required
                    className="bg-white border border-brown-300 focus:border-brown-600 focus:ring-brown-600 rounded-lg px-4 py-6 text-brown-600 placeholder:text-brown-400 mt-2 mb-6 w-full"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-brown-600 hover:bg-black text-white py-5 rounded-lg mt-4"
                >
                  Save Changes
                </Button>
              </form>
            </main>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MemberPage;

import Navbar from "@/components/layout/Navbar";
import { User, UserRound, X } from "lucide-react";
import { RotateCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Footer from "@/components/layout/Footer";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/authentication";
import axios from "axios";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserProfile {
  name: string;
  username: string;
  email: string;
  profile_pic: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ProfilePage = () => {
  const { state, fetchUser } = useAuth();
  const [profileData, setProfileData] = useState<UserProfile>({
    name: "",
    username: "",
    email: "",
    profile_pic: "",
  });
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const fetchProfile = async () => {
    try {
      setProfileData({
        name: state.user?.name || "",
        username: state.user?.username || "",
        email: state.user?.email || "",
        profile_pic: state.user?.profile_pic || "",
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.custom((t) => (
        <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">Failed to fetch profile</h2>
            <p className="text-sm">Please try again later.</p>
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

  useEffect(() => {
    fetchProfile();
  }, [state.user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.custom((t) => (
        <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">Invalid file type</h2>
            <p className="text-sm">
              Please upload a valid image file (JPEG, PNG, GIF, WebP).
            </p>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      ));
      return;
    }

    // Check file size (5MB limit)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.custom((t) => (
        <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">File too large</h2>
            <p className="text-sm">Please upload an image smaller than 5MB.</p>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      ));
      return;
    }

    setImageFile(file);
    setProfileData((prevData) => ({
      ...prevData,
      profile_pic: URL.createObjectURL(file),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      const formData = new FormData();
      formData.append("name", profileData.name);
      formData.append("username", profileData.username);

      if (imageFile) {
        formData.append("imageFile", imageFile);
      }
      const response = await axios.put(
        `${API_BASE_URL}/profile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log(response.data);

      toast.custom((t) => (
        <div className="bg-green-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">
              Profile updated successfully
            </h2>
            <p className="text-sm">Your profile changes have been saved.</p>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      ));
    } catch (error) {
      toast.custom((t) => (
        <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">Failed to update profile</h2>
            <p className="text-sm">Please try again later.</p>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      ));
    } finally {
      setIsSaving(false);
      fetchUser();
    }
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      <Navbar />
      <div className="flex flex-col flex-1 md:grid md:grid-cols-12 md:gap-0">
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
              <Avatar>
                <AvatarImage
                  key={state.user?.profile_pic}
                  src={state.user?.profile_pic}
                  alt={state.user?.name || "Profile Picture"}
                  className="object-cover"
                />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
              <p className="text-headline-4 text-brown-400">
                {state.user?.name || "User Name"}
              </p>
              <p>|</p>
              <p className="text-headline-4">Profile</p>
            </div>
          </section>
          {/* update profile */}
          <section className="px-4 flex flex-col mb-10 md:flex-row md:justify-center md:bg-white md:mb-0">
            <main className="flex flex-col gap-5 py-8 bg-brown-100 rounded-xl md:w-3xl md:rounded-l-none md:bg-white">
              <div className="flex flex-col items-center justify-center gap-5">
                <Avatar className="rounded-full w-30 h-30 shrink-0 object-cover">
                  <AvatarImage
                    key={profileData.profile_pic}
                    src={
                      imageFile
                        ? profileData.profile_pic
                        : state.user?.profile_pic
                    }
                    alt={state.user?.name || "Profile Picture"}
                    className="object-cover"
                  />
                  <AvatarFallback>
                    <User />
                  </AvatarFallback>
                </Avatar>
                <label className="bg-green-500 hover:bg-green-600 text-white py-3 px-5 rounded-lg cursor-pointer text-center">
                  Upload Profile Picture
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              </div>
              <form className="py-5 px-6 w-full" onSubmit={handleSubmit}>
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
                    value={profileData.name}
                    onChange={handleInputChange}
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
                    value={profileData.username}
                    onChange={handleInputChange}
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
                    value={profileData.email}
                    onChange={handleInputChange}
                    disabled
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-brown-600 hover:bg-black text-white py-5 rounded-lg mt-4"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
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

export default ProfilePage;

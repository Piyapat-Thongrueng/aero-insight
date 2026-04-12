import { useState, useEffect, useRef } from "react";
import { X, User } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "@/contexts/authentication";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface AdminProfile {
  name: string;
  username: string;
  email: string;
  profile_pic: string;
  bio: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BIO_MAX_LENGTH = 120;

const AdminProfilePage = () => {
  const { state, fetchUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profileData, setProfileData] = useState<AdminProfile>({
    name: "",
    username: "",
    email: "",
    profile_pic: "",
    bio: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);

  // Load profile from server (ดึงข้อมูล admin จาก DB)
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await axios.get<AdminProfile>(
          `${API_BASE_URL}/admin/profile`,
        );
        setProfileData(response.data);
        setPreviewUrl(response.data.profile_pic ?? "");
      } catch (error) {
        console.error("Failed to load admin profile:", error);
        showErrorToast("Failed to load profile", "Please try again later.");
      }
    };

    if (state.user?.role === "admin") {
      loadProfile();
    }
  }, [state.user]);

  // Input handlers
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      showErrorToast(
        "Invalid file type",
        "Please upload a valid image file (JPEG, PNG, WebP).",
      );
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      showErrorToast(
        "File too large",
        "Please upload an image smaller than 5MB.",
      );
      return;
    }

    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  // Submit handler (ส่งข้อมูลที่แก้ไขไปยัง server เพื่อ update ข้อมูล admin ใน DB)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (profileData.bio.length > BIO_MAX_LENGTH) {
      showErrorToast(
        "Bio too long",
        `Bio must not exceed ${BIO_MAX_LENGTH} characters.`,
      );
      return;
    }

    try {
      setIsSaving(true);

      const formData = new FormData();
      formData.append("name", profileData.name);
      formData.append("username", profileData.username);
      formData.append("bio", profileData.bio);

      if (imageFile) {
        formData.append("imageFile", imageFile);
      }

      await axios.put(`${API_BASE_URL}/admin/profile`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

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

      setImageFile(null);
      await fetchUser();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const msg = error.response?.data?.message || "Please try again later.";
        showErrorToast("Failed to update profile", msg);
      } else {
        showErrorToast("Failed to update profile", "Please try again later.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  // ─── Toast helper ─────────────────────────────────────────────────────────
  const showErrorToast = (title: string, description: string) => {
    toast.custom((t) => (
      <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
        <div>
          <h2 className="font-bold text-lg mb-1">{title}</h2>
          <p className="text-sm">{description}</p>
        </div>
        <button
          onClick={() => toast.dismiss(t)}
          className="text-white hover:text-gray-200"
        >
          <X size={20} />
        </button>
      </div>
    ));
  };

  const bioLength = profileData.bio.length;
  const bioOverLimit = bioLength > BIO_MAX_LENGTH;

  return (
    <div className="flex flex-col h-full">
      {/* ── Page Header ──────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white sticky top-0 z-10">
        <h1 className="text-xl font-semibold text-gray-800">Profile</h1>
        <Button
          type="submit"
          form="admin-profile-form"
          disabled={isSaving || bioOverLimit}
          className="bg-gray-900 hover:bg-black text-white px-6 py-2 rounded-full text-sm font-medium"
        >
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </div>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-100">
        <form
          id="admin-profile-form"
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto"
        >
          {/* ── Single White Card ─────────────────────────────────────────── */}
          <div className="bg-white rounded-xl p-6 flex flex-col gap-5">
            {/* Avatar Row */}
            <div className="flex items-center gap-5">
              <Avatar className="w-20 h-20 shrink-0">
                <AvatarImage
                  key={previewUrl}
                  src={previewUrl}
                  alt={profileData.name || "Admin"}
                  className="object-cover"
                />
                <AvatarFallback className="bg-gray-100">
                  <User className="w-8 h-8 text-gray-400" />
                </AvatarFallback>
              </Avatar>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-5 py-2.5 rounded-full text-sm font-medium transition-colors"
              >
                Upload profile picture
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {/* Divider */}
            <hr className="border-gray-200" />

            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name" className="text-sm text-gray-600">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Full name"
                required
                value={profileData.name}
                onChange={handleInputChange}
                className="border border-gray-200 rounded-lg px-4 py-5 text-gray-800 placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400"
              />
            </div>

            {/* Username */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="username" className="text-sm text-gray-600">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                required
                value={profileData.username}
                onChange={handleInputChange}
                className="border border-gray-200 rounded-lg px-4 py-5 text-gray-800 placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400"
              />
            </div>

            {/* Email (read-only) */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email" className="text-sm text-gray-600">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={profileData.email}
                disabled
                className="bg-gray-100 border border-gray-200 rounded-lg px-4 py-5 text-gray-500 cursor-not-allowed"
              />
            </div>

            {/* Bio */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <Label htmlFor="bio" className="text-sm text-gray-600">
                  Bio (max {BIO_MAX_LENGTH} letters)
                </Label>
                <span
                  className={`text-xs font-medium ${
                    bioOverLimit ? "text-red-500" : "text-gray-400"
                  }`}
                >
                  {bioLength}/{BIO_MAX_LENGTH}
                </span>
              </div>
              <Textarea
                id="bio"
                name="bio"
                placeholder="Tell us about yourself..."
                value={profileData.bio}
                onChange={handleInputChange}
                rows={4}
                className={`border rounded-lg px-4 py-3 text-gray-800 placeholder:text-gray-400 resize-none focus:ring-blue-400 ${
                  bioOverLimit
                    ? "border-red-400 focus:border-red-400"
                    : "border-gray-200 focus:border-blue-400"
                }`}
              />
              {bioOverLimit && (
                <p className="text-xs text-red-500">
                  Bio exceeds {BIO_MAX_LENGTH} characters.
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProfilePage;

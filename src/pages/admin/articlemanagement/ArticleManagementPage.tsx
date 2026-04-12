import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash2, X } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/authentication";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface PostItem {
  id: number;
  title: string;
  category: string | null;
  category_id?: number;
  image?: string;
  description?: string;
  content?: string;
  status_id: number;
}

interface CategoryItem {
  id: number;
  name: string;
}

type ViewMode = "list" | "create" | "edit";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const DRAFT_STATUS_ID = 1;
const PUBLISH_STATUS_ID = 2;

const statusText = (statusId: number) => {
  if (statusId === DRAFT_STATUS_ID) return "Draft";
  if (statusId === PUBLISH_STATUS_ID) return "Published";
  return "Unknown";
};

const statusClass = (statusId: number) => {
  if (statusId === DRAFT_STATUS_ID) {
    return "border-yellow-300 bg-yellow-200 text-yellow-900";
  }
  if (statusId === PUBLISH_STATUS_ID) {
    return "border-green-200 bg-green-100 text-green-900";
  }
  return "border-gray-300 bg-gray-100 text-gray-700";
};

const ArticleManagementPage = () => {
  const { state } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<PostItem | null>(null);

  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [content, setContent] = useState("");

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

  const showSuccessToast = (title: string, description: string) => {
    toast.custom((t) => (
      <div className="bg-green-500 text-white p-4 rounded-sm flex justify-between items-start">
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

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [postsResponse, categoriesResponse] = await Promise.all([
        axios.get<{ posts: PostItem[] }>(`${API_BASE_URL}/posts/me`),
        axios.get<{ data: CategoryItem[] }>(`${API_BASE_URL}/categories`),
      ]);

      setPosts(postsResponse.data.posts ?? []);
      setCategories(categoriesResponse.data.data ?? []);
    } catch {
      showErrorToast("Failed to load posts", "Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchKeyword = post.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchStatus =
      statusFilter === "" || String(post.status_id) === statusFilter;

    const matchCategory =
      categoryFilter === "" ||
      (post.category ?? "").toLowerCase() === categoryFilter.toLowerCase();

    return matchKeyword && matchStatus && matchCategory;
  });

  const handleDelete = async (postId: number) => {

    try {
      await axios.delete(`${API_BASE_URL}/posts/${postId}`);
      setPosts((prev) => prev.filter((post) => post.id !== postId));
      toast.success("Post deleted successfully");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Please try again later.";
        showErrorToast("Failed to delete post", message);
      } else {
        showErrorToast("Failed to delete post", "Please try again later.");
      }
    }
  };

  const handleEdit = (post: PostItem) => {
    const fallbackCategoryId = categories.find(
      (category) => category.name.toLowerCase() === (post.category ?? "").toLowerCase(),
    )?.id;

    setEditingPostId(post.id);
    setCategoryId(String(post.category_id ?? fallbackCategoryId ?? ""));
    setTitle(post.title ?? "");
    setIntroduction(post.description ?? "");
    setContent(post.content ?? "");
    setSelectedImageFile(null);
    setImagePreviewUrl(post.image ?? "");
    setViewMode("edit");
  };

  const resetCreateForm = () => {
    setSelectedImageFile(null);
    setImagePreviewUrl("");
    setCategoryId("");
    setTitle("");
    setIntroduction("");
    setContent("");
  };

  const handleCreate = () => {
    resetCreateForm();
    setEditingPostId(null);
    setViewMode("create");
  };

  const handleCancelCreateOrEdit = () => {
    setViewMode("list");
    setEditingPostId(null);
    resetCreateForm();
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

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      showErrorToast("File too large", "Please upload an image smaller than 5MB.");
      return;
    }

    setSelectedImageFile(file);
    setImagePreviewUrl(URL.createObjectURL(file));
  };

  const handleCreatePost = async (statusId: number) => {
    if (viewMode === "create" && !selectedImageFile) {
      showErrorToast("Validation error", "Thumbnail image is required.");
      return;
    }
    if (!categoryId) {
      showErrorToast("Validation error", "Category is required.");
      return;
    }

    const trimmedTitle = title.trim();
    const trimmedIntroduction = introduction.trim();
    const trimmedContent = content.trim();

    if (!trimmedTitle) {
      showErrorToast("Validation error", "Title is required.");
      return;
    }
    if (trimmedTitle.length > 100) {
      showErrorToast("Validation error", "Title must not exceed 100 characters.");
      return;
    }
    if (!trimmedIntroduction) {
      showErrorToast("Validation error", "Introduction is required.");
      return;
    }
    if (trimmedIntroduction.length > 120) {
      showErrorToast(
        "Validation error",
        "Introduction must not exceed 120 characters.",
      );
      return;
    }
    if (!trimmedContent) {
      showErrorToast("Validation error", "Content is required.");
      return;
    }

    try {
      setIsSaving(true);
      const formData = new FormData();
      if (selectedImageFile) {
        formData.append("imageFile", selectedImageFile);
      }
      formData.append("category_id", categoryId);
      formData.append("title", trimmedTitle);
      formData.append("description", trimmedIntroduction);
      formData.append("content", trimmedContent);
      formData.append("status_id", String(statusId));

      if (viewMode === "create") {
        await axios.post(`${API_BASE_URL}/posts`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else if (viewMode === "edit" && editingPostId) {
        await axios.put(`${API_BASE_URL}/posts/${editingPostId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      await fetchData();
      setViewMode("list");
      setEditingPostId(null);
      resetCreateForm();
      showSuccessToast(
        viewMode === "create"
          ? "Post saved successfully"
          : "Post updated successfully",
        statusId === DRAFT_STATUS_ID
          ? viewMode === "create"
            ? "Your article has been saved as draft."
            : "Your article has been updated and saved as draft."
          : viewMode === "create"
            ? "Your article has been published."
            : "Your article has been updated and published.",
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Please try again later.";
        showErrorToast(
          viewMode === "create" ? "Failed to create post" : "Failed to update post",
          message,
        );
      } else {
        showErrorToast(
          viewMode === "create" ? "Failed to create post" : "Failed to update post",
          "Please try again later.",
        );
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    const { id } = deleteTarget;
    setDeleteTarget(null);
    await handleDelete(id);
  };

  if (viewMode === "create" || viewMode === "edit") {
    return (
      <div className="flex flex-col h-full bg-gray-50">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-gray-800">
            {viewMode === "create" ? "Create article" : "Edit article"}
          </h1>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              onClick={handleCancelCreateOrEdit}
              disabled={isSaving}
              className="rounded-full px-6 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={() => handleCreatePost(DRAFT_STATUS_ID)}
              disabled={isSaving}
              className="rounded-full px-6 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            >
              Save as draft
            </Button>
            <Button
              type="button"
              onClick={() => handleCreatePost(PUBLISH_STATUS_ID)}
              disabled={isSaving}
              className="rounded-full px-6 bg-gray-900 text-white hover:bg-black"
            >
              Save and publish
            </Button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="max-w-5xl">
            <p className="text-sm text-gray-600 mb-3">Thumbnail image</p>
            <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
              <div className="w-full md:w-[320px] h-45 rounded-lg border border-dashed border-gray-300 bg-white flex items-center justify-center overflow-hidden">
                {imagePreviewUrl ? (
                  <img
                    src={imagePreviewUrl}
                    alt="Thumbnail preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-sm text-gray-400">No image selected</span>
                )}
              </div>
              <Button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-full px-6 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              >
                Upload thumbnail image
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">Category</p>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full text-sm text-gray-700 border border-gray-300 rounded-lg px-3 py-3 bg-white"
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Author name</p>
                <Input
                  value={state.user?.name || "-"}
                  disabled
                  className="bg-gray-100 border border-gray-200 text-gray-500"
                />
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Title</p>
              <Input
                placeholder="Article title"
                value={title}
                maxLength={100}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-white"
              />
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-gray-600">Introduction (max 120 letters)</p>
                <span className="text-xs text-gray-400">{introduction.length}/120</span>
              </div>
              <Textarea
                placeholder="Introduction"
                value={introduction}
                maxLength={120}
                onChange={(e) => setIntroduction(e.target.value)}
                rows={4}
                className="bg-white"
              />
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">Content</p>
              <Textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={12}
                className="bg-white min-h-80"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header - Desktop */}
      <div className="hidden md:flex justify-between items-center mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
          Article management
        </h1>
        <Button
          onClick={handleCreate}
          className="bg-black hover:bg-gray-800 text-white rounded-full px-4 py-2 lg:py-6 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Create article</span>
        </Button>
      </div>

      {/* Mobile Create Button */}
      <div className="md:hidden my-4">
        <Button
          onClick={handleCreate}
          className="w-full bg-black hover:bg-gray-800 text-white rounded-full py-3 flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create article</span>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4 mb-4 md:mb-6 ">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 py-2 md:py-5 w-full"
          />
        </div>

        <div className="flex gap-2 sm:gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="flex-1 sm:flex-none text-sm text-gray-700 border border-gray-300 rounded-lg px-3 md:px-4 py-2 md:py-2.5 bg-white"
          >
            <option value="">Status</option>
            <option value="1">Draft</option>
            <option value="2">Published</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="flex-1 sm:flex-none text-sm text-gray-700 border border-gray-300 rounded-lg px-3 md:px-4 py-2 md:py-2.5 bg-white"
          >
            <option value="">Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name.toLowerCase()}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table - Desktop & Tablet */}
      <div className="hidden sm:block bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-medium text-gray-600">
                  Article title
                </th>
                <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-medium text-gray-600">
                  Category
                </th>
                <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-medium text-gray-600">
                  Status
                </th>
                <th className="px-4 md:px-6 py-3 md:py-4 text-right text-xs md:text-sm font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 md:px-6 py-8 text-sm text-gray-500 text-center"
                  >
                    Loading your posts...
                  </td>
                </tr>
              ) : filteredPosts.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 md:px-6 py-8 text-sm text-gray-500 text-center"
                  >
                    You do not have any posts yet.
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-900">
                      {post.title}
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-600">
                      {post.category ?? "-"}
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4">
                      <span
                        className={`inline-flex items-center px-2 md:px-2.5 py-1 md:py-1.5 rounded-full text-xs font-medium border ${statusClass(post.status_id)}`}
                      >
                        • {statusText(post.status_id)}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4 text-right">
                      <button
                        onClick={() => handleEdit(post)}
                        className="text-gray-600 hover:text-gray-900 mr-2 md:mr-3"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(post)}
                        className="text-gray-600 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Card View - Mobile */}
      <div className="sm:hidden space-y-3">
        {isLoading ? (
          <div className="bg-white rounded-lg shadow p-4 text-sm text-gray-500 text-center">
            Loading your posts...
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-4 text-sm text-gray-500 text-center">
            You do not have any posts yet.
          </div>
        ) : (
          filteredPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-medium text-gray-900 flex-1 pr-2">
                  {post.title}
                </h3>
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${statusClass(post.status_id)}`}
                >
                  • {statusText(post.status_id)}
                </span>
              </div>
              <p className="text-xs text-gray-600 mb-3">
                Category: {post.category ?? "-"}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(post)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => setDeleteTarget(post)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-red-300 rounded-lg text-sm text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
      >
        <AlertDialogContent className="max-w-sm rounded-2xl">
          <AlertDialogHeader className="text-center items-center">
            <AlertDialogTitle>Delete article</AlertDialogTitle>
            <AlertDialogDescription>
              Do you want to delete this article?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row justify-center gap-3 sm:justify-center">
            <AlertDialogCancel className="rounded-full px-8 border-gray-300">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="rounded-full px-8 bg-gray-900 hover:bg-black text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ArticleManagementPage;

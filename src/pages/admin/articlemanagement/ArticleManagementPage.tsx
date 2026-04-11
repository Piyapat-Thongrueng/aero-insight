import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash2, X } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

interface PostItem {
  id: number;
  title: string;
  category: string | null;
  status_id: number;
}

interface CategoryItem {
  id: number;
  name: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const statusText = (statusId: number) => {
  if (statusId === 1) return "Published";
  if (statusId === 2) return "Draft";
  return "Unknown";
};

const statusClass = (statusId: number) => {
  if (statusId === 1) {
    return "border-green-200 bg-green-100 text-green-900";
  }
  if (statusId === 2) {
    return "border-yellow-300 bg-yellow-200 text-yellow-900";
  }
  return "border-gray-300 bg-gray-100 text-gray-700";
};

const ArticleManagementPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
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
  }, [posts, searchQuery, statusFilter, categoryFilter]);

  const handleDelete = async (postId: number) => {
    const confirmed = window.confirm("Do you want to delete this article?");
    if (!confirmed) return;

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

  const handleEdit = () => {
    showErrorToast("Edit page not ready", "Edit flow will be connected next.");
  };

  const handleCreate = () => {
    showErrorToast(
      "Create page not ready",
      "Create flow will be connected in the next step.",
    );
  };

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
            <option value="1">Published</option>
            <option value="2">Draft</option>
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
                        onClick={handleEdit}
                        className="text-gray-600 hover:text-gray-900 mr-2 md:mr-3"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
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
                  onClick={handleEdit}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
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
    </div>
  );
};

export default ArticleManagementPage;

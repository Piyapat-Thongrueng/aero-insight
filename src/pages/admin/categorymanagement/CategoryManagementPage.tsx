import { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2, X } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

interface Category {
  id: number;
  name: string;
}

type ViewMode = "list" | "create" | "edit";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CategoryManagementPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState<ViewMode>("list");
  const [formName, setFormName] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // ─── Toast helpers ─────────────────────────────────────────────────────────
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

  // ─── Fetch all categories ──────────────────────────────────────────────────
  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get<{ data: Category[] }>(
        `${API_BASE_URL}/categories`,
      );
      setCategories(response.data.data);
    } catch {
      showErrorToast("Failed to load categories", "Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Filtered list
  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // View transitions
  const handleOpenCreate = () => {
    setFormName("");
    setEditingCategory(null);
    setView("create");
  };

  const handleOpenEdit = (category: Category) => {
    setFormName(category.name);
    setEditingCategory(category);
    setView("edit");
  };

  // Save (create or edit)
  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedName = formName.trim();

    if (!trimmedName) {
      showErrorToast("Validation error", "Category name is required.");
      return;
    }

    try {
      setIsSaving(true);

      if (view === "create") {
        await axios.post(`${API_BASE_URL}/categories`, { name: trimmedName });
        showSuccessToast(
          "Category created",
          `"${trimmedName}" has been added.`,
        );
      } else if (view === "edit" && editingCategory) {
        await axios.put(`${API_BASE_URL}/categories/${editingCategory.id}`, {
          name: trimmedName,
        });
        showSuccessToast(
          "Category updated",
          `Category has been updated to "${trimmedName}".`,
        );
      }

      await fetchCategories();
      setView("list");
      setFormName("");
      setEditingCategory(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const msg = error.response?.data?.message || "Please try again later.";
        showErrorToast("Failed to save category", msg);
      } else {
        showErrorToast("Failed to save category", "Please try again later.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  // Delete
  // จับค่า id/name ไว้ใน local const ก่อน ป้องกัน race condition กับ AlertDialog ที่ auto-close
  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    const { id, name } = deleteTarget;
    setDeleteTarget(null); // ปิด dialog ทันที

    try {
      await axios.delete(`${API_BASE_URL}/categories/${id}`);
      showSuccessToast("Category deleted", `"${name}" has been removed.`);
      await fetchCategories();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const msg = error.response?.data?.message || "Please try again later.";
        showErrorToast("Failed to delete category", msg);
      } else {
        showErrorToast("Failed to delete category", "Please try again later.");
      }
    }
  };

  // LIST VIEW
  if (view === "list") {
    return (
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white sticky top-0 z-10">
          <h1 className="text-xl font-semibold text-gray-800">
            Category management
          </h1>
          <Button
            onClick={handleOpenCreate}
            className="bg-gray-900 hover:bg-black text-white px-5 py-2 rounded-full text-sm font-medium flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create category
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-100">
          {/* Search */}
          <div className="relative mb-4 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-white"
            />
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                    Category
                  </th>
                  <th className="px-6 py-3 w-24" />
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={2}
                      className="px-6 py-10 text-center text-sm text-gray-400"
                    >
                      Loading...
                    </td>
                  </tr>
                ) : filteredCategories.length === 0 ? (
                  <tr>
                    <td
                      colSpan={2}
                      className="px-6 py-10 text-center text-sm text-gray-400"
                    >
                      {searchQuery
                        ? "No categories match your search."
                        : "No categories yet."}
                    </td>
                  </tr>
                ) : (
                  filteredCategories.map((category) => (
                    <tr
                      key={category.id}
                      className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {category.name}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleOpenEdit(category)}
                          className="text-gray-400 hover:text-gray-700 mr-3 transition-colors"
                          aria-label="Edit category"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(category)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          aria-label="Delete category"
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

        {/* Delete Confirm Modal */}
        <AlertDialog
          open={!!deleteTarget}
          onOpenChange={(open) => {
            if (!open) setDeleteTarget(null);
          }}
        >
          <AlertDialogContent className="max-w-sm rounded-2xl">
            <AlertDialogHeader className="text-center items-center">
              <AlertDialogTitle>Delete category</AlertDialogTitle>
              <AlertDialogDescription>
                Do you want to delete this category?
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
  }

  // CREATE / EDIT VIEW
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white sticky top-0 z-10">
        <h1 className="text-xl font-semibold text-gray-800">
          {view === "create" ? "Create category" : "Edit category"}
        </h1>
        <Button
          type="submit"
          form="category-form"
          disabled={isSaving}
          className="bg-gray-900 hover:bg-black text-white px-6 py-2 rounded-full text-sm font-medium"
        >
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-100">
        <form
          id="category-form"
          onSubmit={handleSave}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-xl p-6 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="categoryName" className="text-sm text-gray-600">
                Category name
              </Label>
              <Input
                id="categoryName"
                placeholder="Category name"
                required
                autoFocus
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="border border-gray-200 rounded-lg px-4 py-5 text-gray-800 placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryManagementPage;

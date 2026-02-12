import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash2 } from "lucide-react";

const ArticleManagementPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header - Desktop (REVIEWED) */}
      <div className="hidden md:flex justify-between items-center mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
          Article management
        </h1>
        <Button className="bg-black hover:bg-gray-800 text-white rounded-full px-4 py-2 lg:py-6 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Create article</span>
        </Button>
      </div>

      {/* Mobile Create Button (REVIEWED) */}
      <div className="md:hidden my-4">
        <Button className="w-full bg-black hover:bg-gray-800 text-white rounded-full py-3 flex items-center justify-center gap-2">
          <Plus className="w-4 h-4" />
          <span>Create article</span>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4 mb-4 md:mb-6 ">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 py-2 md:py-5 w-full"
          />
        </div>

        {/* Filters Row */}
        <div className="flex gap-2 sm:gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="flex-1 sm:flex-none text-sm text-gray-700 border border-gray-300 rounded-lg px-3 md:px-4 py-2 md:py-2.5 bg-white"
          >
            <option value="">Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="flex-1 sm:flex-none text-sm text-gray-700 border border-gray-300 rounded-lg px-3 md:px-4 py-2 md:py-2.5 bg-white"
          >
            <option value="">Category</option>
            <option value="cat">Cat</option>
            <option value="general">General</option>
            <option value="inspiration">Inspiration</option>
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
              {/* Example Row 1 */}
              <tr className="hover:bg-gray-50">
                <td className="px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-900">
                  Understanding Cat Behavior: Why Your Feline Friend Acts the
                  Way They Do
                </td>
                <td className="px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-600">
                  Cat
                </td>
                <td className="px-4 md:px-6 py-3 md:py-4">
                  <span className="inline-flex items-center px-2 md:px-2.5 py-1 md:py-1.5 rounded-full text-xs font-medium border border-green-200 bg-green-100 text-green-900">
                    • Published
                  </span>
                </td>
                <td className="px-4 md:px-6 py-3 md:py-4 text-right">
                  <button className="text-gray-600 hover:text-gray-900 mr-2 md:mr-3">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="text-gray-600 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>

              {/* Example Row 2 */}
              <tr className="hover:bg-gray-50">
                <td className="px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-900">
                  Understanding Cat Behavior: Why Your Feline Friend Acts the
                  Way They Do
                </td>
                <td className="px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-600">
                  Cat
                </td>
                <td className="px-4 md:px-6 py-3 md:py-4">
                  <span className="inline-flex items-center px-2 md:px-2.5 py-1 md:py-1.5 rounded-full text-xs font-medium border border-yellow-300 bg-yellow-200 text-yellow-900">
                    • Draft
                  </span>
                </td>
                <td className="px-4 md:px-6 py-3 md:py-4 text-right">
                  <button className="text-gray-600 hover:text-gray-900 mr-2 md:mr-3">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="text-gray-600 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Card View - Mobile */}
      <div className="sm:hidden space-y-3">
        {/* Article Card 1 */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-medium text-gray-900 flex-1 pr-2">
              Understanding Cat Behavior: Why Your Feline Friend Acts the Way
              They Do
            </h3>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border border-green-200 bg-green-100 text-green-900 whitespace-nowrap">
              • Published
            </span>
          </div>
          <p className="text-xs text-gray-600 mb-3">Category: Cat</p>
          <div className="flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
              <Edit className="w-4 h-4" />
              Edit
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-red-300 rounded-lg text-sm text-red-600 hover:bg-red-50">
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>

        {/* Article Card 2 */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-medium text-gray-900 flex-1 pr-2">
              Understanding Cat Behavior: Why Your Feline Friend Acts the Way
              They Do
            </h3>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border border-yellow-300 bg-yellow-200 text-yellow-900 whitespace-nowrap">
              • Draft
            </span>
          </div>
          <p className="text-xs text-gray-600 mb-3">Category: Cat</p>
          <div className="flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
              <Edit className="w-4 h-4" />
              Edit
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-red-300 rounded-lg text-sm text-red-600 hover:bg-red-50">
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleManagementPage;

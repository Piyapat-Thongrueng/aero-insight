// src/pages/admin/ArticleManagementPage.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash2 } from "lucide-react";

const ArticleManagementPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Article management</h1>
        <Button className="bg-black hover:bg-gray-800 text-white rounded-full px-6">
          <Plus className="w-4 h-4 mr-2" />
          Create article
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <select className="border border-gray-300 rounded-lg px-4 py-2">
          <option>Status</option>
          <option>Published</option>
          <option>Draft</option>
        </select>
        <select className="border border-gray-300 rounded-lg px-4 py-2">
          <option>Category</option>
          <option>Cat</option>
          <option>General</option>
          <option>Inspiration</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                Article title
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                Category
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                Status
              </th>
              <th className="px-6 py-4 text-right text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {/* Example Row */}
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-900">
                Understanding Cat Behavior: Why Your Feline Friend Acts the Way
                They Do
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">Cat</td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  • Published
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="text-gray-600 hover:text-gray-900 mr-3">
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
  );
};

export default ArticleManagementPage;

import { Input } from "@/components/ui/input";
import axios from "axios";
import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Post {
  id: number;
  title: string;
  category: string;
  description: string;
}

export function SearchFeature() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const latestRequestRef = useRef(0);
  const navigate = useNavigate();

  // ✅ ค้นหาบทความจาก API

  const handleSearchPosts = async () => {
    const keyword = searchQuery.trim();

    // ถ้า searchQuery ว่าง ให้ล้างผลลัพธ์การค้นหา
    if (keyword.length < 1) {
      latestRequestRef.current += 1;
      setSearchResults([]);
      setShowResults(false);
      setIsLoading(false);
      return;
    }

    const requestId = ++latestRequestRef.current;
    setIsLoading(true);
    setShowResults(true);
    // เรียก API เพื่อค้นหาบทความ
    try {
      const response = await axios.get(
        `${API_BASE_URL}/posts`,
        {
          params: {
            keyword,
            limit: 6,
          },
        },
      );

      if (requestId !== latestRequestRef.current) {
        return;
      }

      setSearchResults(response.data.posts || []);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      if (requestId === latestRequestRef.current) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      handleSearchPosts();
    }, 500); // รอ 500ms หลังจากหยุดพิมพ์
    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  // ฟังก์ชันสำหรับตรวจจับการคลิกนอกกรอบ

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // เมื่อคลิกบทความ → ไปหน้า View Post Page
  const handlePostClick = (postId: number) => {
    navigate(`/post/${postId}`);
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
  };

  // ล้างการค้นหา
  const handleClear = () => {
    latestRequestRef.current += 1;
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
    setIsLoading(false);
  };

  return (
    <div className="relative w-full" ref={searchRef}>
      <Input
        type="text"
        placeholder="Search"
        className="bg-white py-6 px-3 text-body-1 border border-brown-300 cursor-pointer"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => searchQuery.length >= 1 && setShowResults(true)}
      />
      {searchQuery.length >= 1 ? (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-brown-400 hover:text-brown-600 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      ) : (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-brown-400">
          <Search className="h-4 w-4" />
        </div>
      )}

      {showResults && (
        <div className="absolute top-full mt-2 w-full bg-white shadow-lg border border-brown-200 max-h-80 overflow-y-auto z-50">
          {isLoading ? (
            // Loading State
            <div className="p-4 text-center text-brown-400 text-sm">
              Searching...
            </div>
          ) : searchResults.length > 0 ? (
            // Results Found
            <div className="py-2">
              {searchResults.map((post) => (
                <div
                  key={post.id}
                  onClick={() => handlePostClick(post.id)}
                  className="text-body-1 px-4 py-3 hover:bg-brown-200 cursor-pointer transition-colors border-b border-brown-100 last:border-b-0"
                >
                  {/* Title */}
                  <h3 className="text-brown-600 font-medium text-sm line-clamp-1 mb-1">
                    {post.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-brown-400 line-clamp-2">
                    {post.description}
                  </p>

                  {/* Category Badge */}
                  <span className="inline-block mt-2 px-2 py-1 bg-brand-green-soft text-brand-green text-xs rounded-full">
                    {post.category}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            // No Results
            <div className="p-4 text-center text-brown-400 text-sm">
              No articles found for "{searchQuery}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}

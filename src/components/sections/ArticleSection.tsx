import ArticleFilter from "../articles/ArticleFilter";
import ArticleGrid from "../articles/ArticleGrid";
import ViewMoreButton from "../articles/ViewMoreButton";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

interface PostListProps {
  id: number;
  image: string;
  category: string;
  title: string;
  description: string;
  author: string;
  created_at: string;
  likes: number;
  content: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ALL_CATEGORY = "ทั้งหมด";

const ArticleSection = () => {
  const [categories, setCategories] = useState<string[]>([ALL_CATEGORY]);
  const [selectedCategory, setSelectedCategory] = useState<string>(ALL_CATEGORY);
  const [postList, setPostList] = useState<PostListProps[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const latestRequestRef = useRef(0);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories`);
      const categoryNames = (response.data?.data ?? [])
        .map((category: { name?: string }) => category?.name?.trim())
        .filter((name: string | undefined): name is string => Boolean(name));

      setCategories([ALL_CATEGORY, ...categoryNames]);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([ALL_CATEGORY]);
    }
  };

  // 1. Fetch post data from API using axios
  const fetchPosts = async (category: string, pageNum: number) => {
    const requestId = ++latestRequestRef.current;
    setIsLoading(true);
    try {
      const categoryParam = category === ALL_CATEGORY ? "" : category;
      const response = await axios.get(
        `${API_BASE_URL}/posts`,
        {
          params: {
            page: pageNum,
            limit: 6,
            category: categoryParam,
          },
        },
      );
      const newPosts = response.data.posts || [];

      if (requestId !== latestRequestRef.current) {
        return;
      }

      //  เพิ่มโพสต์ใหม่ต่อท้ายโพสต์เดิม (ไม่แทนที่)
      setPostList((prevPosts) => {
        const existingPostId = prevPosts.map((post) => post.id);
        const filteredNewPosts = newPosts.filter(
          (post: PostListProps) => !existingPostId.includes(post.id),
        );
        return [...prevPosts, ...filteredNewPosts];
      });
      // เช็คว่ายังมีข้อมูลเหลือไหม
      setHasMore(response.data.currentPage < response.data.totalPages);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      if (requestId === latestRequestRef.current) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Effect 1: รีเซ็ตเมื่อเปลี่ยน category
  useEffect(() => {
    setPostList([]);
    setPage(1);
    setHasMore(true);
  }, [selectedCategory]);

  // Effect 2: โหลดข้อมูลเมื่อ page หรือ category เปลี่ยน
  useEffect(() => {
    fetchPosts(selectedCategory, page);
  }, [selectedCategory, page]);

  //  Handler: เมื่อกด View more
  const handleViewMore = () => {
    if (!isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <section className="lg:px-20 lg:pt-6">
      {/* Article header */}
      <div className="px-4 pb-3 pt-2 w-full sm:px-7 lg:pb-7">
        <h1 className="text-headline-3 text-brown-600">Latest articles</h1>
      </div>

      <ArticleFilter
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        isLoading={isLoading}
      />

      {/* Article content */}
      <ArticleGrid postList={postList} isLoading={isLoading && page === 1} />

      <ViewMoreButton
        isLoading={isLoading}
        hasMore={hasMore}
        onViewMore={handleViewMore}
      />
    </section>
  );
};

export default ArticleSection;

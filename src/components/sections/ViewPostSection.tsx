import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "../ui/spinner";
import PostContent from "../viewposts/PostContent";
import PostHeader from "../viewposts/PostHeader";
import PostComment from "../viewposts/PostComment";
import AuthModal from "../modals/AuthModal";
import { toast } from "sonner";

interface Post {
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

const ViewPostSection = () => {
  const [post, setPost] = useState<Post | null>(null);
  const { postId } = useParams<{ postId: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);

  const fetchPostById = async (id: string) => {
    setIsLoading(true);
    setError(false);
    try {
      const response = await axios.get(`https://server-aero-insight.vercel.app/posts/${id}`);
      console.log("Fetched post by POST_ID:", response.data.data);
      setPost(response.data.data);
    } catch (error) {
      console.error("Error fetching post:", error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (postId) {
      fetchPostById(postId);
    }
  }, [postId]);

  const handleLikeClick = () => {
    setShowAuthModal(true);
  };

  const handleCommentAction = () => {
    setShowAuthModal(true);
  };

  const handleCopyLink = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);

      // แสดง toast สำเร็จ
      toast.success("Copied!", {
        description: "This article link has been copied to your clipboard.",
        duration: 3000,
      });
    } catch (error) {
      console.error("Failed to copy:", error);

      // แสดง toast error
      toast.error("Failed to copy link", {
        description: "Please try again.",
        duration: 3000,
      });
    }
  };

  return (
    <>
      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-20 gap-4 h-screen">
          <Spinner className="size-10" />
          <p className="text-body-1 text-brown-400">Loading article...</p>
        </div>
      )}

      {/* Error State */}
      {!isLoading && (error || !post) && (
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold text-brown-600 mb-4">
            Article Not Found
          </h1>
          <p className="text-brown-400 mb-8">
            Sorry, we couldn't find the article you're looking for.
          </p>
          <a
            href="/"
            className="bg-brown-600 text-white px-6 py-3 rounded-full hover:bg-brown-700 inline-block"
          >
            Back to Home
          </a>
        </div>
      )}

      {/* Success State */}
      {!isLoading && !error && post && (
        <section className="w-full md:grid md:grid-cols-12">
          <PostHeader post={post} />
          <PostContent post={post} />
          <PostComment
            post={post}
            onLikeClick={handleLikeClick}
            onCommentAction={handleCommentAction}
            onCopyLink={handleCopyLink}
          />
          <AuthModal
            isOpen={showAuthModal}
            onClose={() => setShowAuthModal(false)}
          />
        </section>
      )}
    </>
  );
};

export default ViewPostSection;

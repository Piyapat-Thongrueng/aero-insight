import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "../ui/spinner";
import PostContent from "../viewposts/PostContent";
import PostHeader from "../viewposts/PostHeader";
import PostComment from "../viewposts/PostComment";
import AuthModal from "../modals/AuthModal";
import { toast } from "sonner";
import { useAuth } from "@/contexts/authentication";

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

interface CommentItem {
  id: number;
  post_id: number;
  user_id: string;
  comment_text: string;
  created_at: string;
  user_name: string;
  user_profile_pic: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ViewPostSection = () => {
  const { state } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const { postId } = useParams<{ postId: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isLikeLoading, setIsLikeLoading] = useState<boolean>(false);
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [commentText, setCommentText] = useState<string>("");
  const [isCommentLoading, setIsCommentLoading] = useState<boolean>(false);

  const fetchPostById = async (id: string) => {
    setIsLoading(true);
    setError(false);
    try {
      const response = await axios.get(`${API_BASE_URL}/posts/${id}`);
      console.log("Fetched post by POST_ID:", response.data.data);
      setPost(response.data.data);
    } catch (error) {
      console.error("Error fetching post:", error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchComments = async (id: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/posts/${id}/comments`);
      setComments(response.data?.data || []);
    } catch (fetchError) {
      console.error("Error fetching comments:", fetchError);
      setComments([]);
    }
  };

  const fetchMyLikeStatus = async (id: string) => {
    if (!state.user) {
      setIsLiked(false);
      return;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/posts/${id}/likes/me`);
      setIsLiked(Boolean(response.data?.liked));
    } catch (fetchError) {
      console.error("Error fetching my like status:", fetchError);
      setIsLiked(false);
    }
  };

  useEffect(() => {
    if (postId) {
      fetchPostById(postId);
      fetchComments(postId);
      fetchMyLikeStatus(postId);
    }
  }, [postId, state.user]);

  const handleLikeClick = async () => {
    if (!state.user) {
      setShowAuthModal(true);
      return;
    }

    if (!postId || isLikeLoading) {
      return;
    }

    try {
      setIsLikeLoading(true);
      const response = await axios.post(`${API_BASE_URL}/posts/${postId}/likes/toggle`);
      const liked = Boolean(response.data?.data?.liked);
      const likesCount = Number(response.data?.data?.likesCount || 0);

      setIsLiked(liked);
      setPost((prevPost) =>
        prevPost
          ? {
              ...prevPost,
              likes: likesCount,
            }
          : prevPost,
      );
    } catch (likeError) {
      console.error("Error toggling like:", likeError);
      toast.error("Failed to update like", {
        description: "Please try again.",
        duration: 3000,
      });
    } finally {
      setIsLikeLoading(false);
    }
  };

  const handleCommentFocus = () => {
    if (!state.user) {
      setShowAuthModal(true);
    }
  };

  const handleCommentSubmit = async () => {
    if (!state.user) {
      setShowAuthModal(true);
      return;
    }

    if (!postId || isCommentLoading) {
      return;
    }

    const normalizedComment = commentText.trim();
    if (!normalizedComment) {
      toast.error("Comment cannot be empty", {
        description: "Please enter your comment before sending.",
        duration: 3000,
      });
      return;
    }

    try {
      setIsCommentLoading(true);
      const response = await axios.post(`${API_BASE_URL}/posts/${postId}/comments`, {
        comment_text: normalizedComment,
      });

      const createdComment = response.data?.data;
      if (createdComment) {
        setComments((prevComments) => [createdComment, ...prevComments]);
      }
      setCommentText("");
    } catch (commentError) {
      console.error("Error creating comment:", commentError);
      toast.error("Failed to send comment", {
        description: "Please try again.",
        duration: 3000,
      });
    } finally {
      setIsCommentLoading(false);
    }
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
        <div className="min-h-screen container mx-auto px-4 py-20 text-center">
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
            isLiked={isLiked}
            isLikeLoading={isLikeLoading}
            comments={comments}
            commentText={commentText}
            isCommentLoading={isCommentLoading}
            onLikeClick={handleLikeClick}
            onCommentFocus={handleCommentFocus}
            onCommentTextChange={setCommentText}
            onCommentSubmit={handleCommentSubmit}
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

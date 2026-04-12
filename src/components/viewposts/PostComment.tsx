import CopyLinkIcon from "../icons/CopyLinkIcon";
import FacebookIcon from "../icons/FacebookIcon";
import LinkInIcon from "../icons/LinkInIcon";
import SmileIcon from "../icons/SmileIcon";
import XtwiiterIcon from "../icons/XtwiiterIcon";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from "lucide-react";

interface PostCommentProps {
  post: {
    id: number;
    image: string;
    category: string;
    title: string;
    description: string;
    author: string;
    created_at: string;
    likes: number;
    content: string;
  };
  isLiked: boolean;
  isLikeLoading: boolean;
  commentText: string;
  isCommentLoading: boolean;
  comments: {
    id: number;
    user_name: string;
    user_profile_pic: string;
    comment_text: string;
    created_at: string;
  }[];
  onLikeClick: () => void;
  onCommentFocus: () => void;
  onCommentTextChange: (value: string) => void;
  onCommentSubmit: () => void;
  onCopyLink: () => void;
}

const PostComment = ({
  post,
  isLiked,
  isLikeLoading,
  commentText,
  isCommentLoading,
  comments,
  onLikeClick,
  onCommentFocus,
  onCommentTextChange,
  onCommentSubmit,
  onCopyLink,
}: PostCommentProps) => {
  const formatCommentDateTime = (dateString: string) => {
    const date = new Date(dateString);

    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const formattedTime = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return `${formattedDate} at ${formattedTime}`;
  };

  // ฟังก์ชันสำหรับแชร์ไป Social Media
  const handleSocialShare = (platform: "facebook" | "linkedin" | "twitter") => {
    const currentUrl = window.location.href;
    const encodedUrl = encodeURIComponent(currentUrl);

    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/share.php?u=${encodedUrl}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/share?url=${encodedUrl}`;
        break;
    }

    // เปิดหน้าต่างใหม่
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="md:col-span-8 md:px-7 lg:px-15">
      {/* Emoji & likes */}
      <section className="w-full px-4 py-6 bg-brown-200 mb-5 mt-5 md:mt-0 flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:rounded-3xl md:py-4 md:px-8">
        <div
          onClick={onLikeClick}
          className={`cursor-pointer px-6 py-4 rounded-full border border-black flex items-center justify-center gap-1 md:py-3 md:px-10 ${
            isLiked ? "bg-yellow-100" : "bg-white"
          } ${isLikeLoading ? "opacity-60 pointer-events-none" : "hover:opacity-70"}`}
        >
          <SmileIcon isActive={isLiked} />
          <span>{post.likes}</span>
        </div>
        <div className="flex items-center justify-between md:gap-6">
          <div
            onClick={onCopyLink}
            className="flex px-8 py-5 bg-white cursor-pointer hover:opacity-70 rounded-full border border-black items-center gap-2 md:py-4 md:px-10"
          >
            <CopyLinkIcon />
            <p className="text-body-1">Copy Link</p>
          </div>
          <div className="flex gap-2 flex-wrap md:gap-4">
            <div onClick={() => handleSocialShare("facebook")}>
              <FacebookIcon />
            </div>
            <div onClick={() => handleSocialShare("linkedin")}>
              <LinkInIcon />
            </div>
            <div onClick={() => handleSocialShare("twitter")}>
              <XtwiiterIcon />
            </div>
          </div>
        </div>
      </section>

      {/* Comment */}
      <section className="w-full px-5 flex flex-col space-y-4 mb-14 md:px-0">
        <h2 className="text-body-1 text-brown-400">Comment</h2>
        <Textarea
          name="description"
          id="description"
          placeholder="What are your thoughts?"
          className="border border-brown-400 p-4 rounded-lg bg-white"
          value={commentText}
          onFocus={onCommentFocus}
          onChange={(e) => onCommentTextChange(e.target.value)}
        ></Textarea>
        <Button
          variant="default"
          size="lg"
          className="w-36 rounded-full py-6 text-body-1 text-white md:px-10 md:self-end cursor-pointer"
          onClick={onCommentSubmit}
          disabled={isCommentLoading}
        >
          {isCommentLoading ? "Sending..." : "Send"}
        </Button>
      </section>

      {/* User's comment */}
      <section className="w-full px-4 sm:px-0 mb-10">
        {comments.length === 0 && (
          <p className="text-body-1 text-brown-400">No comments yet. Be the first to comment.</p>
        )}

        {comments.map((comment) => (
          <article
            key={comment.id}
            className="w-full border-b border-brown-300 pb-8 mb-8 md:pb-10 md:mb-10"
          >
            <div className="flex items-start gap-4">
              <Avatar className="rounded-full w-14 h-14 shrink-0">
                <AvatarImage
                  src={comment.user_profile_pic}
                  alt={comment.user_name}
                  className="object-cover"
                />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="text-body-1 leading-none font-semibold text-brown-600 md:text-[18px]">
                  {comment.user_name}
                </p>
                <p className="text-body-2 text-brown-400 mt-2">
                  {formatCommentDateTime(comment.created_at)}
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-6">
              <p className="text-body-1 text-brown-400 whitespace-pre-line leading-relaxed">
                {comment.comment_text}
              </p>
            </div>
          </article>
        ))}
      </section>
    </section>
  );
};

export default PostComment;

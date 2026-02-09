import { formatDate } from "@/utils/formatDate";
import CopyLinkIcon from "../icons/CopyLinkIcon";
import FacebookIcon from "../icons/FacebookIcon";
import LinkInIcon from "../icons/LinkInIcon";
import SmileIcon from "../icons/SmileIcon";
import XtwiiterIcon from "../icons/XtwiiterIcon";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

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
  onLikeClick: () => void;
  onCommentAction: () => void;
  onCopyLink: () => void;
}

const PostComment = ({
  post,
  onLikeClick,
  onCommentAction,
  onCopyLink,
}: PostCommentProps) => {
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
          className="bg-white cursor-pointer hover:opacity-70 px-6 py-4 rounded-full border border-black flex items-center justify-center gap-1 md:py-3 md:px-10"
        >
          <SmileIcon />
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
          onFocus={onCommentAction}
        ></Textarea>
        <Button
          variant="default"
          size="lg"
          className="w-36 rounded-full py-6 text-body-1 text-white md:px-10 md:self-end cursor-pointer"
          onClick={onCommentAction}
        >
          Send
        </Button>
      </section>

      {/* User's comment */}
      <section className="w-full px-4 sm:px-0 mb-10">
        <div className="flex gap-4 border-b border-brown-300 w-full pb-5 flex-wrap mb-5">
          <img
            src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"
            alt={post.title}
            className="rounded-full w-13 h-12"
          />
          <div className="flex flex-col items-start justify-start">
            <p className="text-headline-4 text-brown-500">{post.author}</p>
            <p className="text-body-3 text-brown-400">
              {formatDate(post.created_at)} at 18:30 AM
            </p>
          </div>
          <div>
            <p className="text-body-1 text-brown-400">
              I loved this article! It really explains why my cat is so
              independent yet loving. The purring section was super interesting.
            </p>
          </div>
        </div>
        <div className="flex gap-4 border-b border-brown-300 w-full pb-5 flex-wrap mb-5">
          <img
            src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"
            alt={post.title}
            className="rounded-full w-13 h-12"
          />
          <div className="flex flex-col items-start justify-start">
            <p className="text-headline-4 text-brown-500">{post.author}</p>
            <p className="text-body-3 text-brown-400">
              {formatDate(post.created_at)} at 18:30 AM
            </p>
          </div>
          <div>
            <p className="text-body-1 text-brown-400">
              I loved this article! It really explains why my cat is so
              independent yet loving. The purring section was super interesting.
            </p>
          </div>
        </div>
        <div className="flex gap-4 border-b border-brown-300 w-full pb-5 flex-wrap mb-5">
          <img
            src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"
            alt={post.title}
            className="rounded-full w-13 h-12"
          />
          <div className="flex flex-col items-start justify-start">
            <p className="text-headline-4 text-brown-500">{post.author}</p>
            <p className="text-body-3 text-brown-400">
              {formatDate(post.created_at)} at 18:30 AM
            </p>
          </div>
          <div>
            <p className="text-body-1 text-brown-400">
              I loved this article! It really explains why my cat is so
              independent yet loving. The purring section was super interesting.
            </p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default PostComment;

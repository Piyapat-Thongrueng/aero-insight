import { formatDate } from "@/utils/formatDate";
import CopyLinkIcon from "../icons/CopyLinkIcon";
import FacebookIcon from "../icons/FacebookIcon";
import LinkInIcon from "../icons/LinkInIcon";
import SmileIcon from "../icons/SmileIcon";
import XtwiiterIcon from "../icons/XtwiiterIcon";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface PostCommentProps {
  id: number;
  image: string;
  category: string;
  title: string;
  description: string;
  author: string;
  date: string;
  likes: number;
  content: string;
}

const PostComment = ({ post }: { post: PostCommentProps }) => {
  return (
    <footer className="col-span-8">
      {/* Emoji & likes */}
      <section className="w-full px-4 py-6 bg-brown-200 mb-5 mt-5 flex flex-col gap-5">
        <div className="bg-white px-6 py-4 rounded-full border border-black flex items-center justify-center gap-1">
          <SmileIcon />
          <span>{post.likes}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex px-8 py-5 bg-white rounded-full border border-black items-center gap-2">
            <CopyLinkIcon />
            <p>Copy Link</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <FacebookIcon />
            <LinkInIcon />
            <XtwiiterIcon />
          </div>
        </div>
      </section>

      {/* Comment */}
      <section className="w-full px-4 flex flex-col space-y-4 mb-14">
        <h2 className="text-body-1 text-brown-400">Comment</h2>
        <Textarea
          name="description"
          id="description"
          placeholder="What are your thoughts"
          className="border border-brown-400 p-4 rounded-lg"
        ></Textarea>
        <Button
          variant="default"
          size="lg"
          className="w-3/12 rounded-full py-6 text-body-1 text-white"
        >
          Send
        </Button>
      </section>

      {/* User's comment */}
      <section className="w-full px-4 mb-10">
        <div className="flex gap-4 border-b border-brown-300 w-full pb-5 flex-wrap mb-5">
          <img
            src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"
            alt={post.title}
            className="rounded-full w-13 h-12"
          />
          <div className="flex flex-col items-start justify-start">
            <p className="text-headline-4 text-brown-500">{post.author}</p>
            <p className="text-body-3 text-brown-400">
              {formatDate(post.date)} at 18:30 AM
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
              {formatDate(post.date)} at 18:30 AM
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
              {formatDate(post.date)} at 18:30 AM
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
    </footer>
  );
};

export default PostComment;

import { formatDate } from "@/utils/formatDate";

interface PostHeaderProps {
  post: {
    id: number;
    image: string;
    category: string;
    title: string;
    description: string;
    author: string;
    date: string;
    likes: number;
    content: string;
  };
}

const PostHeader = ({ post }: PostHeaderProps) => {
  return (
    <>
      {/* Image Header */}
      <header className="w-full md:col-span-12 md:px-20 md:pt-14">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-56 object-cover mb-2 md:rounded-xl md:h-160"
        />
      </header>

      {/* Title */}
      <header className="w-full p-4 gap-4 md:col-span-8 md:px-20 md:mt-3">
        <div className="flex items-center gap-5 mb-4">
          <span className="bg-brand-green-soft text-brand-green px-4 py-2 rounded-2xl text-body-2">
            {post.category}
          </span>
          <span className="text-body-1 text-brown-400">
            {formatDate(post.date)}
          </span>
        </div>
        <p className="text-brown-600 text-[24px] md:text-[40px] font-semibold">
          {post.title}
        </p>
      </header>
    </>
  );
};

export default PostHeader;

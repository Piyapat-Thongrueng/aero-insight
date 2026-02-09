import { formatDate } from "@/utils/formatDate";
import { Link } from "react-router-dom";

interface BlogCardProps {
  id: number;
  image: string;
  category: string;
  title: string;
  description: string;
  author: string;
  created_at: string;
}

const BlogCard = ({
  id,
  image,
  category,
  title,
  description,
  author,
  created_at,
}: BlogCardProps) => {
  const formattedDate = formatDate(created_at);

  return (
    <article>
      <Link to={`/post/${id}`}>
        <div>
          <img
            src={image}
            alt={title}
            className="w-full object-cover h-64 rounded-4xl sm:h-118.75 lg:w-full lg:h-118.75"
          />
        </div>
        <div className="py-3">
          <button className="bg-brand-green-soft text-brand-green px-4 py-2 rounded-2xl text-body-2">
            {category}
          </button>
        </div>
        <header>
          <h2 className="text-headline-4 text-brown-600">{title}</h2>
        </header>
        <div>
          <p className="pt-3 text-body-2 text-brown-400 line-clamp-2">
            {description}
          </p>
        </div>
        <div className="flex py-5 justify-start items-center gap-2">
          <div className="">
            <img
              src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"
              alt="profile-image"
              className="w-7 h-6 rounded-full"
            />
          </div>
          <div>
            <p className="text-body-2 text-brown-500">{author}</p>
          </div>
          <div>
            <p className="text-brown-300">|</p>
          </div>
          <div>
            <p className="text-body-2 text-brown-400">{formattedDate}</p>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default BlogCard;

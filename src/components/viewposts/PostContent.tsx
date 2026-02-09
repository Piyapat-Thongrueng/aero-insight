import ReactMarkdown from "react-markdown";

interface PostContentProps {
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
}

const PostContent = ({ post }: PostContentProps) => {
  return (
    <>
      {/* Main Content Section */}
      <main className="p-5 sm:px-8 md:col-span-8 md:flex md:flex-col md:gap-5 lg:px-15">
        <p className="text-body-1 text-brown-500">{post.description}</p>
        <article className="markdown text-brown-500 mb-5 text-body-1">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>
      </main>

      {/* Author Card Section */}
      <aside className="p-4 md:col-span-4 md:pr-10 md:-mt-55 md:-mb-96 lg:pr-15">
        <div className="bg-brown-200 p-6 rounded-xl flex flex-col items-start gap-4 sticky top-20">
          {/* Author Info */}
          <div className="flex gap-4 border-b-2 border-brown-300 w-full pb-5 flex-wrap">
            <img
              src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"
              alt={`${post.author} profile picture`}
              className="rounded-full w-13 h-12 object-cover"
            />
            <div className="flex flex-col items-start">
              <p className="text-body-3 text-brown-400">Author</p>
              <h3 className="text-headline-4 text-brown-500">{post.author}</h3>
            </div>
          </div>

          {/* Author Bio */}
          <div className="space-y-4">
            <p className="text-body-1 text-brown-400">
              I am a pet enthusiast and freelance writer who specializes in
              animal behavior and care. With a deep love for cats, I enjoy
              sharing insights on feline companionship and wellness.
            </p>
            <p className="text-body-1 text-brown-400">
              When I'm not writing, I spend time volunteering at my local animal
              shelter, helping cats find loving homes.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default PostContent;

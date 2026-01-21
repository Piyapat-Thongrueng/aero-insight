import ReactMarkdown from "react-markdown";

interface PostContentProps {
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

const PostContent = ({ post }: { post: PostContentProps }) => {
  return (
    <>
      <main className="w-full p-4 md:col-span-8 md:px-20 md:flex md:flex-col md:gap-5">
        <div className="text-body-1 text-brown-500">{post.description}</div>
        <div className="markdown text-brown-500 mb-5">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </main>
      <section className="p-4 md:col-span-4">
        <div className="bg-brown-200 p-6 rounded-xl flex flex-col items-start justify-start gap-4 md:col-span-4">
          <div className="flex gap-4 border-b-2 border-brown-300 w-full pb-5 flex-wrap">
            <img
              src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"
              alt={post.title}
              className="rounded-full w-13 h-12"
            />
            <div className="flex flex-col items-start justify-start">
              <p className="text-body-3 text-brown-400">Author</p>
              <p className="text-headline-4 text-brown-500">{post.author}</p>
            </div>
          </div>
          <div>
            <p className="text-body-1 text-brown-400">
              I am a pet enthusiast and freelance writer who specializes in
              animal behavior and care. With a deep love for cats, I enjoy
              sharing insights on feline companionship and wellness.
            </p>
            <br />
            <p className="text-body-1 text-brown-400">
              When i’m not writing, I spends time volunteering at my local
              animal shelter, helping cats find loving homes.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default PostContent;

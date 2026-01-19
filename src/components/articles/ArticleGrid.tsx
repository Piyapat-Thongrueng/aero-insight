import BlogCard from "../cards/BlogCard";

interface ArticleGridProps {
  postList: Post[];
  isLoading: boolean;
}

interface Post {
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

const ArticleGrid = ({ postList, isLoading }: ArticleGridProps) => {
  return (
    <section className="grid grid-cols-1 pt-7 pb-2 px-3 w-full justify-center lg:grid-cols-2 lg:gap-6 lg:px-0">
      {isLoading ? (
        <div className="col-span-2 text-center py-10">
          <p className="text-body-1 text-brown-400">Loading articles...</p>
        </div>
      ) : postList.length > 0 ? (
        postList.map((post) => (
          <BlogCard
            key={post.id}
            image={post.image}
            category={post.category}
            title={post.title}
            description={post.description}
            author={post.author}
            date={post.date}
          />
        ))
      ) : (
        <div className="col-span-2 text-center py-10">
          <p className="text-body-1 text-brown-400">
            No articles found in this category
          </p>
        </div>
      )}
    </section>
  );
};

export default ArticleGrid;

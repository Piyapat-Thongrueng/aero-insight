import { blogPosts } from "@/data/blogPosts";
import BlogCard from "../cards/BlogCard";
import { InputDemo } from "../common/InputDemo";
import { SelectScrollable } from "../common/SelectScrollable";
import { useState } from "react";

const ArticleSection = () => {
  // ใช้ map ข้อมูล category
  const categories = ["Highlight", "Cat", "Inspiration", "General"];

  const [selectedCategory, setSelectedCategory] = useState<string>("Highlight");

  const filteredPosts =
    selectedCategory === "Highlight"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <section className="lg:px-20 lg:pt-6">
      {/* Lastest article */}
      <div className="px-4 pb-3 pt-2 w-full lg:pb-7">
        <h1 className="text-headline-3 text-brown-600">Latest articles</h1>
      </div>
      {/* Aricle filter */}
      <section className="bg-brown-200 w-full py-4 lg:rounded-3xl">
        <div className="w-full px-4">
          <div className="lg:flex lg:justify-between lg:items-center lg:px-2">
            <div className="hidden lg:flex lg:gap-5">
              {categories.map((category) => (
                <button
                  className={`p-3 rounded-lg text-body-1 transition-colors cursor-pointer ${
                    selectedCategory === category
                      ? "bg-brown-300 text-brown-600"
                      : "text-brown-400 hover:bg-brown-300 hover:text-brown-500"
                  }`}
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="lg:w-3/12">
              <InputDemo />
            </div>
          </div>
          <p className="mt-4 mb-1 text-sm text-brown-400 lg:hidden text-body-1">
            Category
          </p>
          <div className="lg:hidden">
            <SelectScrollable
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            />
          </div>
        </div>
      </section>

      {/* Article content */}
      <section className="grid grid-cols-1 pt-7 pb-2 px-3 w-full justify-center lg:grid-cols-2 lg:gap-6 lg:px-0">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
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

      {/* Sub-Footer */}
      <div className="flex w-full justify-center items-center py-10 px-7 ">
        <p className="text-body-1 text-brown-600 text-center hover:underline">
          View more
        </p>
      </div>
    </section>
  );
};

export default ArticleSection;

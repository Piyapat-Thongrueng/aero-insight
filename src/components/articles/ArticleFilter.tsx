import { SearchFeature } from "./SearchFeature";
import { SelectScrollable } from "../common/SelectScrollable";

interface ArticleFilterProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  isLoading: boolean;
}

const ArticleFilter = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  isLoading,
}: ArticleFilterProps) => {
  return (
    <section className="bg-brown-200 w-full py-4 sm:px-2 sm:py-7 lg:rounded-3xl">
      <div className="w-full px-4">
        <div className="lg:flex lg:justify-between lg:items-center lg:px-2">
          <div className="hidden lg:flex lg:gap-5">
            {categories.map((category) => (
              <button
                className={`p-3 rounded-lg text-body-1 transition-colors cursor-pointer ${
                  selectedCategory === category
                    ? "bg-brown-300 text-brown-600"
                    : "text-brown-400 hover:bg-brown-300 hover:text-brown-500"
                } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                key={category}
                onClick={() => setSelectedCategory(category)}
                disabled={isLoading}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="lg:w-3/12">
            <SearchFeature />
          </div>
        </div>
        <p className="mt-4 mb-3 text-sm text-brown-400 lg:hidden text-body-1">
          Category
        </p>
        <div className="lg:hidden">
          <SelectScrollable
            categories={categories}
            value={selectedCategory}
            onValueChange={setSelectedCategory}
          />
        </div>
      </div>
    </section>
  );
};

export default ArticleFilter;

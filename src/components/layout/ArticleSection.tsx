import CourseCards from "../cards/CourseCards";
import { InputDemo } from "../commons/InputDemo";
import { SelectScrollable } from "../commons/SelectScrollable";

const ArticleSection = () => {
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
              <button className="hover:bg-brown-300 hover:text-brown-500 p-3 rounded-lg text-body-1 text-brown-400">
                Hightlight
              </button>
              <button className="hover:bg-brown-300 hover:text-brown-500 p-3 rounded-lg text-body-1 text-brown-400">
                Cat
              </button>
              <button className="hover:bg-brown-300 hover:text-brown-500 p-3 rounded-lg text-body-1 text-brown-400">
                Inspiration
              </button>
              <button className="hover:bg-brown-300 hover:text-brown-500 p-3 rounded-lg text-body-1 text-brown-400">
                General
              </button>
            </div>
            <div className="lg:w-3/12">
              <InputDemo />
            </div>
          </div>
          <p className="mt-4 mb-1 text-sm text-brown-400 lg:hidden">Category</p>
          <div className="lg:hidden">
            <SelectScrollable />
          </div>
        </div>
      </section>

      {/* Article content */}
      <section className="grid grid-cols-1 pt-7 pb-2 px-3 w-full justify-center lg:grid-cols-2 lg:gap-6 lg:px-0">
        <CourseCards />
        <CourseCards />
        <CourseCards />
        <CourseCards />
        <CourseCards />
        <CourseCards />
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

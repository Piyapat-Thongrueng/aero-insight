import { InputDemo } from "../commons/InputDemo";
import { SelectScrollable } from "../commons/SelectScrollable";

const ArticleSection = () => {
  return (
    <section className="lg:px-60">
      <section>
        <div className="px-4 pb-3 pt-2 w-full lg:pb-7">
          <h1 className="text-headline-3 text-brown-600">Latest articles</h1>
        </div>
      </section>
      <section className="bg-brown-200 w-full py-5 lg:rounded-3xl">
        <div className="w-full px-4">
          <div className="lg:flex lg:justify-between lg:items-center lg:px-2">
            <div className="hidden lg:flex lg:gap-10 ">
              <button className="hover:bg-brown/300">Hightlight</button>
              <button>Cat</button>
              <button>Inspiration</button>
              <button>General</button>
            </div>
            <div>
              <InputDemo />
            </div>
          </div>
          <p className="mt-4 mb-1 text-sm text-brown-400 lg:hidden">Category</p>
          <div className="lg:hidden">
            <SelectScrollable />
          </div>
        </div>
      </section>
    </section>
  );
};

export default ArticleSection;

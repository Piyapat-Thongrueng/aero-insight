import { InputDemo } from "../commons/InputDemo";
import { SelectScrollable } from "../commons/SelectScrollable";


const ArticleSection = () => {
  return (
    <>
      <section>
        <div className="px-8 pb-3 pt-2 w-full">
          <h1 className="text-headline-3 text-brown-600">Latest articles</h1>
        </div>
      </section>

      <section className="bg-brown-200 w-full px-8 py-5">
        <div className="flex flex-col">
            <InputDemo />
          <p className="mt-4 mb-1 text-body-1 text-brown-400">Category</p>
          <SelectScrollable />
        </div>
      </section>
    </>
  );
};

export default ArticleSection;

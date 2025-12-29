import cat from "../../assets/images/cat.svg";

const CourseCards = () => {
  return (
    <div>
      <div>
        <img src={cat} alt="cat" className="w-full object-cover lg:w-full lg:h-auto" />
      </div>
      <div className="py-3">
        <button className="bg-brand-green-soft text-brand-green px-4 py-2 rounded-full text-body-2">
          Cat
        </button>
      </div>
      <div>
        <h2 className="text-headline-4 text-brown-600">
          Understanding Cat Behavior: Why Your Feline Friend Acts the Way They
          Do
        </h2>
      </div>
      <div>
        <p className="pt-3 text-body-2 text-brown-400 line-clamp-2">
          Dive into the curious world of cat behavior, exploring why cats knead,
          purr, and chase imaginary prey. This article helps pet owners decode
          their feline's actions and understand how their instincts as hunters
          shape their daily routines.
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
          <p className="text-body-2 text-brown-500">Thompson P.</p>
        </div>
        <div>
          <p className="text-brown-300">|</p>
        </div>
        <div>
          <p className="text-body-2 text-brown-400">11 September 2024</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCards;

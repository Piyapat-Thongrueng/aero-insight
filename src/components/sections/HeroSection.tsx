const HeroSection = () => {
  return (
    <section className="px-4 py-8 sm:px-7 lg:pt-14 bg-white">
      {/* Grid Container */}
      <div className="grid grid-cols-1 gap-8 items-center max-w-7xl mx-auto lg:grid-cols-[1.6fr_2.1fr_1.8fr] lg:gap-12">
        {/* Left Column - Heading & Subtitle */}
        <div className="text-center space-y-4 lg:text-end">
          <h1 className="text-headline-2 text-brown-600 leading-tight weight-headline">
            Stay <br className="hidden lg:block" /> Informed, <br />
            Stay Inspired
          </h1>
          <p className="text-body-1 text-brown-400 max-w-md mx-auto font-medium">
            Discover a World of Knowledge at Your Fingertips. Your Daily Dose of
            Inspiration <br className="hidden lg:inline" /> and Information.
          </p>
        </div>
        {/* Center Column - Hero Image */}
        <div className="flex justify-center">
          <div className="w-full">
            <img
              src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"
              alt="Author with cat in autumn forest"
              className="rounded-4xl opacity-80 object-cover w-full h-117.5 sm:h-130 lg:w-full lg:h-132.25"
            />
          </div>
        </div>

        {/* Right Column - Author Info */}
        <div className="flex flex-col justify-center items-start">
          <p className="text-body-3 text-brown-400">-Author</p>
          <h3 className="text-headline-3 text-brown-500">Thompson P.</h3>

          <div className="space-y-4 py-4">
            <p className="text-brown-400 text-body-1">
              I am a pet enthusiast and freelance writer who specializes in
              animal behavior and care. With a deep love for cats, I enjoy
              sharing insights on feline companionship and wellness.
            </p>
            <p className="text-brown-400 text-body-1">
              When i’m not writing, I spends time volunteering at my local
              animal shelter, helping cats find loving homes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

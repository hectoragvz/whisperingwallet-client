function HeroSection() {
  return (
    <div className="flex flex-col items-center mt-6 lg:mt-10">
      <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl text-center tracking">
        Track your expenses{" "}
        <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-transparent bg-clip-text">
          3x faster
        </span>{" "}
        with Whispering Wallet
      </h1>
      <p className="mt-5 text-lg text-center">
        Simply speak and record what you just spent on, we´ll handle the rest
      </p>
    </div>
  );
}

export default HeroSection;

export default function HeroSection() {
  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-4 max-w-lg">
          <h1 className="text-3xl font-semibold text-gray-900 leading-tight mb-4">
            Find &amp; Hire Trusted Artisans Near You
          </h1>
          <p className="text-gray-500 mb-8">
            From plumbers to painters, hire verified professionals in minutes.
          </p>
          <div className="flex gap-4 flex-wrap">
            <a
              href="/find-artisan"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-md transition-colors"
            >
              Find An Artisan
            </a>
            <a
              href="/become-artisan"
              className="border border-gray-400 text-gray-700 hover:bg-gray-200 font-medium px-6 py-2.5 rounded-md transition-colors"
            >
              Become Our Artisan
            </a>
          </div>
        </div>
        <div className="flex-6 flex justify-center">
          <img
            src="/hero-plumber.png"
            alt="Artisan at work"
            className="w-full max-w-xl rounded-xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}

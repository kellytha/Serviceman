export default function ArtisanCTA() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-4 max-w-lg">
          <h2 className="text-3xl font-semibold text-gray-900 leading-tight mb-4">
            Turn Your Skills Into Steady Income
          </h2>
          <p className="text-gray-600 mb-8">
            Join Serviceman and connect with clients that need your services.
            Build your repetition and grow your business.
          </p>
          <div className="flex gap-4 flex-wrap">
            <a
              href="/become-artisan"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-md transition-colors"
            >
              Create Your Profile
            </a>
            <a
              href="#how-it-works"
              className="border border-gray-400 text-gray-700 hover:bg-gray-100 font-medium px-6 py-2.5 rounded-md transition-colors"
            >
              How It Works
            </a>
          </div>
        </div>
        <div className="flex-6 flex justify-center">
          <img
            src="/artisan-image.png"
            alt="Artisan in workshop"
            className="w-full max-w-xl rounded-xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}

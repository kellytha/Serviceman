export default function SkilledArtisanCTA() {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 text-center relative">
        <div className="absolute top-0 right-6">
          <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded-full flex items-center gap-2 hover:bg-blue-700 transition-colors">
            <span>?</span> Help
          </button>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Are You A Skilled Artisan?</h2>
        <p className="text-gray-500 mb-8">
          Join Serviceman today and reach thousands of clients looking for your services
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="/become-artisan"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-md transition-colors"
          >
            Start Earning Today
          </a>
          <a
            href="/find-artisan"
            className="border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium px-6 py-2.5 rounded-md transition-colors"
          >
            Join Our Artisans
          </a>
        </div>
      </div>
    </section>
  );
}

export default function SkilledArtisanCTA() {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-4 flex justify-end md:absolute md:top-0 md:right-6 md:mb-0">
          <button
            type="button"
            className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700"
            aria-label="Help"
          >
            <span aria-hidden>?</span>
            Help
          </button>
        </div>
        <div className="text-center">
          <h2 className="mb-3 text-3xl font-bold text-gray-900">
            Are You A Skilled Artisan?
          </h2>
          <p className="mb-8 text-gray-500">
            Join Serviceman today and reach thousands of clients looking for your
            services
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/become-artisan"
              className="rounded-md bg-blue-600 px-6 py-2.5 font-medium text-white transition-colors hover:bg-blue-700"
            >
              Join Our Artisans and Start Earning Today
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

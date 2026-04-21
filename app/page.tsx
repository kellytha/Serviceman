import Navbar from "./components/Navbar";

const services = [
  { name: "Plumbing", count: 120, icon: "🔧" },
  { name: "Electrical", count: 100, icon: "⚡" },
  { name: "Carpentry", count: 80, icon: "🪚" },
  { name: "Painting", count: 150, icon: "🖌️" },
  { name: "General Repair", count: 140, icon: "🔩" },
  { name: "House Cleaning", count: 150, icon: "🧹" },
  { name: "Moving", count: 123, icon: "📦" },
  { name: "Tailoring", count: 110, icon: "🪡" },
];

const testimonials = [
  {
    name: "Mariam",
    role: "Client",
    text: "I like that I could compare different artisans before choosing. It gave me confidence I was making the right decision",
    initials: "M",
    bg: "bg-gray-400",
  },
  {
    name: "Mariam",
    role: "Client",
    text: "The electrician I hired was professional and showed up on time. I'll definitely use Serviceman again.",
    initials: "M",
    bg: "bg-gray-700",
  },
  {
    name: "Kendrick",
    role: "Artisan",
    text: "The platform helps me showcase my work and build trust with new clients.",
    initials: "K",
    bg: "bg-green-600",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      {/* Hero */}
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

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            How It Works
          </h2>
          <p className="text-gray-500 mb-12">
            Three simple steps to start your journey on Serviceman
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                ),
                title: "Get Connected",
                desc: "Clients find artisans. Artisans get discovered.",
              },
              {
                icon: (
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                ),
                title: "Engage",
                desc: "Clients book and Artisans accept and complete jobs.",
              },
              {
                icon: (
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
                title: "Get Results",
                desc: "Clients get quality service. Artisans earn and grow.",
              },
            ].map((step) => (
              <div
                key={step.title}
                className="bg-gray-50 rounded-xl p-8 flex flex-col items-center text-center gap-4"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center">
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Artisan CTA */}
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

      {/* Testimonials */}
      <section id="testimonials" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            What Users Say
          </h2>
          <p className="text-gray-500 mb-12">
            Stories from satisfied clients and thriving artisans across the
            platform.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-blue-50 rounded-xl p-6 flex flex-col gap-4 text-left"
              >
                <div
                  className={`w-12 h-12 rounded-full ${t.bg} flex items-center justify-center text-white font-semibold text-lg`}
                >
                  {t.initials}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {t.text}
                </p>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {t.name}
                  </p>
                  <p className="text-gray-500 text-xs">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Help Today */}
      <section id="services" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Get Help Today
          </h2>
          <p className="text-gray-500 mb-8 text-sm">
            From urgent repairs to planned projects, connect with trusted
            experts in just a few clicks.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {services.map((s) => (
              <a
                key={s.name}
                href={`/services/${s.name.toLowerCase().replace(" ", "-")}`}
                className="border border-gray-200 rounded-xl p-5 flex flex-col items-center gap-2 hover:border-blue-400 hover:bg-blue-50 transition-colors text-center"
              >
                <span className="text-2xl">{s.icon}</span>
                <p className="font-medium text-gray-900 text-sm">{s.name}</p>
                <p className="text-gray-400 text-xs">{s.count} Artisans</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Skilled Artisan CTA */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center relative">
          <div className="absolute top-0 right-6">
            <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded-full flex items-center gap-2 hover:bg-blue-700 transition-colors">
              <span>?</span> Help
            </button>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Are You A Skilled Artisan?
          </h2>
          <p className="text-gray-500 mb-8">
            Join Serviceman today and reach thousands of clients looking for
            your services
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

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-4 text-center">
          <img
            src="/Logo.png"
            alt="Serviceman logo"
            className="h-9 w-auto brightness-200"
          />
          <p className="text-gray-400 text-sm">
            © 2026 Serviceman connecting artisans to the world
          </p>
          <div className="flex flex-col items-center gap-2">
            <span className="text-gray-400 text-sm">Follow Us</span>
            <div className="flex gap-4 text-gray-400">
              {["Facebook", "Instagram", "TikTok", "Twitter", "LinkedIn"].map(
                (s) => (
                  <span
                    key={s}
                    className="hover:text-white cursor-pointer text-xs"
                  >
                    {s[0]}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

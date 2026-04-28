import Navbar from "../components/Navbar";
import ServicesGrid from "../components/ServicesGrid";
import ArtisanCTA from "../components/ArtisanCTA";
import Footer from "../components/Footer";

export default function FindArtisanPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section
        className="relative isolate min-h-screen overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(rgba(233, 237, 244, 0.72), rgba(233, 237, 244, 0.72)), url('/artisan-image.png')",
          backgroundSize: "cover",
          backgroundPosition: "left 14% center",
        }}
      >
        <div className="mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 py-14 md:grid-cols-2 md:gap-14 md:px-10">
          <div className="max-w-md">
            <h1 className="text-3xl font-semibold leading-tight text-slate-900 md:text-4xl">
              Which artisan are you looking to hire?
            </h1>
          </div>

          <div className="rounded-2xl bg-slate-200/95 p-6 shadow-xl backdrop-blur-sm md:p-8">
            <form className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="full-name"
                    className="mb-2 block text-lg font-medium text-slate-900"
                  >
                    Full Name
                  </label>
                  <input
                    id="full-name"
                    type="text"
                    placeholder="Kendrick Ogooluwa Bello"
                    className="h-12 w-full rounded-md border border-slate-300 bg-white px-4 text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-lg font-medium text-slate-900"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="08012345678"
                    className="h-12 w-full rounded-md border border-slate-300 bg-white px-4 text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="location"
                    className="mb-2 block text-lg font-medium text-slate-900"
                  >
                    Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    placeholder="Ogudu GRA"
                    className="h-12 w-full rounded-md border border-slate-300 bg-white px-4 text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-lg font-medium text-slate-900"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="abcd@example.com"
                    className="h-12 w-full rounded-md border border-slate-300 bg-white px-4 text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="artisan-type"
                  className="mb-2 block text-[1.5rem] font-semibold leading-tight text-slate-900"
                >
                  Which artisan are you looking to hire?
                </label>
                <select
                  id="artisan-type"
                  className="h-12 w-full rounded-md border border-slate-300 bg-white px-4 text-slate-700 outline-none focus:border-blue-500"
                  defaultValue="Carpenter"
                >
                  <option>Carpenter</option>
                  <option>Plumber</option>
                  <option>Electrician</option>
                  <option>Painter</option>
                  <option>Tiler</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="request"
                  className="mb-2 block text-[1.5rem] font-semibold leading-tight text-slate-900"
                >
                  What do you want to fix
                </label>
                <textarea
                  id="request"
                  rows={3}
                  placeholder="Describe what you want the artisan to do"
                  className="w-full resize-none rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="mx-auto block rounded-xl bg-blue-700 px-10 py-3 text-xl font-medium text-white transition hover:bg-blue-800"
              >
                Submit your Request
              </button>
            </form>
          </div>
        </div>
      </section>

      <ServicesGrid />
      <ArtisanCTA
        title="Relocating soon? We've got you covered."
        description="From small apartment moves to full home relocation, get reliable hands in minutes."
        primaryCtaText="Book Moving Service Now"
        primaryCtaHref="/services/moving"
        secondaryCtaText=""
        secondaryCtaHref=""
        imageSrc="/mover.png"
        imageAlt="Moving service support"
      />
      <Footer />
    </div>
  );
}

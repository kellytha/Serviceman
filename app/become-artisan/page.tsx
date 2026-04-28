import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ArtisanCTA from "../components/ArtisanCTA";
import SkilledArtisanCTA from "../components/SkilledArtisanCTA";

export default function BecomeArtisanPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section
        className="relative isolate min-h-screen overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(rgba(240, 242, 247, 0.7), rgba(240, 242, 247, 0.7)), url('/painter.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center justify-center px-6 py-14">
          <div className="mb-8 max-w-3xl text-center">
            <h1 className="mb-2 text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">
              Get Hired for What You Do Best
            </h1>
            <p className="text-2xl text-slate-800 md:text-4xl">
              Showcase your skills, get booked by real clients, and grow your
              business with ease.
            </p>
          </div>

          <div className="w-full max-w-3xl rounded-2xl bg-slate-200/95 p-6 shadow-xl backdrop-blur-sm md:p-8">
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
                    htmlFor="experience"
                    className="mb-2 block text-lg font-medium text-slate-900"
                  >
                    Years of Experience
                  </label>
                  <input
                    id="experience"
                    type="text"
                    placeholder="5 years"
                    className="h-12 w-full rounded-md border border-slate-300 bg-white px-4 text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="service"
                  className="mb-2 block text-[1.5rem] font-semibold leading-tight text-slate-900"
                >
                  What service do you offer?
                </label>
                <select
                  id="service"
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
                  htmlFor="availability"
                  className="mb-2 block text-[1.5rem] font-semibold leading-tight text-slate-900"
                >
                  Work Style &amp; Availability
                </label>
                <select
                  id="availability"
                  className="h-12 w-full rounded-md border border-slate-300 bg-white px-4 text-slate-700 outline-none focus:border-blue-500"
                  defaultValue="Weekends Only"
                >
                  <option>Weekends Only</option>
                  <option>Weekdays Only</option>
                  <option>Flexible</option>
                  <option>Full-time</option>
                </select>
              </div>

              <button
                type="submit"
                className="mx-auto block rounded-xl bg-blue-700 px-10 py-3 text-xl font-medium text-white transition hover:bg-blue-800"
              >
                Become An artisan
              </button>
            </form>
          </div>
        </div>
      </section>
      <ArtisanCTA />
      <SkilledArtisanCTA />
      <Footer />
    </div>
  );
}

import { testimonials } from "@/lib/data";

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">What Users Say</h2>
        <p className="text-gray-500 mb-12">
          Stories from satisfied clients and thriving artisans across the platform.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-blue-50 rounded-xl p-6 flex flex-col gap-4 text-left">
              <div className={`w-12 h-12 rounded-full ${t.bg} flex items-center justify-center text-white font-semibold text-lg`}>
                {t.initials}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{t.text}</p>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                <p className="text-gray-500 text-xs">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

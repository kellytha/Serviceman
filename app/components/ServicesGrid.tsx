const services = [
  { name: "Plumbing", count: 120, icon: "/assets/plumbing.png" },
  { name: "Electrical", count: 100, icon: "/assets/Lightning.png" },
  { name: "Carpentry", count: 80, icon: "/assets/Hammer.png" },
  { name: "Painting", count: 150, icon: "/assets/PaintRoller.png" },
  { name: "General Repair", count: 140, icon: "/assets/Wrench.png" },
  { name: "House Cleaning", count: 150, icon: "/assets/SprayBottle.png" },
  { name: "Moving", count: 123, icon: "/assets/Van.png" },
  { name: "Tailoring", count: 110, icon: "/assets/Needle.png" },
];

export default function ServicesGrid() {
  return (
    <section id="services" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Get Help Today</h2>
        <p className="text-gray-500 mb-8 text-sm">
          From urgent repairs to planned projects, connect with trusted experts in just a few clicks.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {services.map((s) => (
            <a
              key={s.name}
              href={`/services/${s.name.toLowerCase().replace(" ", "-")}`}
              className="border border-gray-200 rounded-xl p-5 flex flex-col items-center gap-2 hover:border-blue-400 hover:bg-blue-50 transition-colors text-center"
            >
              <img src={s.icon} alt={s.name} className="w-8 h-8 object-contain" />
              <p className="font-medium text-gray-900 text-sm">{s.name}</p>
              <p className="text-gray-400 text-xs">{s.count} Artisans</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

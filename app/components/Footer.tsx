import { socialLinks } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-4 text-center">
        <img src="/Logo.png" alt="Serviceman logo" className="h-9 w-auto brightness-200" />
        <p className="text-gray-400 text-sm">© 2026 Serviceman connecting artisans to the world</p>
        <div className="flex flex-col items-center gap-2">
          <span className="text-gray-400 text-sm">Follow Us</span>
          <div className="flex gap-4 text-gray-400">
            {socialLinks.map((s) => (
              <span key={s} className="hover:text-white cursor-pointer text-xs">{s[0]}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

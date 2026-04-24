import type { IconType } from "react-icons";
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { socialLinks } from "@/lib/data";

const socialIcon: Record<string, IconType> = {
  Facebook: FaFacebook,
  Instagram: FaInstagram,
  TikTok: FaTiktok,
  X: FaXTwitter,
  LinkedIn: FaLinkedin,
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-10 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 text-center">
        <div className="flex items-center gap-2">
          <img
            src="/Logo.png"
            alt="Serviceman logo"
            className="h-9 w-auto brightness-200"
          />
          <span className="text-lg font-semibold text-white">Serviceman</span>
        </div>
        <p className="text-sm text-gray-400">
          © 2026 Serviceman connecting artisans to the world
        </p>
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-400">Follow Us</span>
          <ul
            className="flex gap-4 text-gray-400"
            aria-label="Social media links"
          >
            {socialLinks.map((s) => {
              const Icon = socialIcon[s.name];
              if (!Icon) return null;
              return (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 transition-colors hover:text-white"
                    aria-label={s.name}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
}

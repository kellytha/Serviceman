import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/Logo.png" alt="Serviceman logo" width={36} height={36} className="h-9 w-auto" priority />
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-blue-600 font-medium text-sm">Home</Link>
          <Link href="/#how-it-works" className="text-gray-700 hover:text-blue-600 text-sm">How It Works</Link>
          <Link href="/#testimonials" className="text-gray-700 hover:text-blue-600 text-sm">What Users Say</Link>
          <Link href="/#services" className="text-gray-700 hover:text-blue-600 text-sm">Services</Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/signup"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2 rounded-md transition-colors"
          >
            Sign Up
          </Link>
          <Link
            href="/login"
            className="border border-blue-600 text-blue-600 hover:bg-blue-50 text-sm font-medium px-5 py-2 rounded-md transition-colors"
          >
            Log In
          </Link>
        </div>
      </div>
    </nav>
  );
}

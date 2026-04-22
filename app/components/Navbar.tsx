export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <img src="/Logo.png" alt="Serviceman logo" className="h-9 w-auto" />
        </a>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="/" className="text-blue-600 font-medium text-sm">Home</a>
          <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 text-sm">How It Works</a>
          <a href="#testimonials" className="text-gray-700 hover:text-blue-600 text-sm">What Users Say</a>
          <a href="#services" className="text-gray-700 hover:text-blue-600 text-sm">Services</a>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <a
            href="/signup"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2 rounded-md transition-colors"
          >
            Sign Up
          </a>
          <a
            href="/login"
            className="border border-blue-600 text-blue-600 hover:bg-blue-50 text-sm font-medium px-5 py-2 rounded-md transition-colors"
          >
            Log In
          </a>
        </div>
      </div>
    </nav>
  );
}

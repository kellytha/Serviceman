import Image from "next/image";
import Link from "next/link";

type ArtisanCTAProps = {
  title?: string;
  description?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  imageSrc?: string;
  imageAlt?: string;
};

export default function ArtisanCTA({
  title = "Turn Your Skills Into Steady Income",
  description = "Join Serviceman and connect with clients that need your services. Build your reputation and grow your business.",
  primaryCtaText = "Create Your Profile",
  primaryCtaHref = "/become-artisan",
  secondaryCtaText = "How It Works",
  secondaryCtaHref = "/#how-it-works",
  imageSrc = "/artisan-image.png",
  imageAlt = "Artisan in workshop",
}: ArtisanCTAProps) {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-4 max-w-lg">
          <h2 className="text-3xl font-semibold text-gray-900 leading-tight mb-4">
            {title}
          </h2>
          <p className="text-gray-600 mb-8">{description}</p>
          <div className="flex gap-4 flex-wrap">
            <Link
              href={primaryCtaHref}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-md transition-colors"
            >
              {primaryCtaText}
            </Link>
            {secondaryCtaText && secondaryCtaHref ? (
              <Link
                href={secondaryCtaHref}
                className="border border-gray-400 text-gray-700 hover:bg-gray-100 font-medium px-6 py-2.5 rounded-md transition-colors"
              >
                {secondaryCtaText}
              </Link>
            ) : null}
          </div>
        </div>
        <div className="flex-6 flex justify-center">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={640}
            height={420}
            className="w-full max-w-xl rounded-xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}

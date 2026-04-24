import { steps } from "@/lib/data";

const stepIcons = [
  "/assets/connector.png",
  "/assets/CalendarCheck.png",
  "/assets/CheckCircle.png",
] as const;

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative isolate">
      <img
        src="/how-it-works.png"
        alt=""
        className="block h-auto w-full max-w-none"
        decoding="async"
      />
      <div className="pointer-events-none absolute inset-0 bg-slate-900/20" aria-hidden />
      <div className="absolute inset-0 z-10 flex flex-col">
        <header className="shrink-0 px-6 pt-12 text-center drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] md:pt-16">
          <h2 className="mb-2 text-3xl font-bold text-white md:text-4xl">How It Works</h2>
          <p className="mx-auto max-w-2xl text-base text-white md:text-lg">
            Three simple steps to start your journey on Serviceman
          </p>
        </header>
        <div className="flex flex-1 items-center px-6 pb-12 md:pb-16">
          <div className="mx-auto w-full max-w-7xl">
            <div className="max-w-xl">
              <div className="space-y-10 rounded-2xl bg-white p-10 shadow-[0_2px_20px_rgba(15,23,42,0.08)] md:rounded-3xl">
                {steps.map((step, i) => (
                  <div key={step.title} className="flex items-center gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#f0f2f5]">
                      <img
                        src={stepIcons[i]}
                        alt=""
                        width={32}
                        height={32}
                        className="h-8 w-8 object-contain"
                      />
                    </div>
                    <p className="text-[15px] font-normal leading-relaxed text-gray-900 md:text-base">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

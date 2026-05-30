const FEATURES = ["Permanent solution", "Full mouth rehab"] as const;

/** Service overlay — the "planted" end state of the implant experience. */
export function ServiceLayer() {
  return (
    <div className="flex h-full items-center">
      <div className="container">
        <div className="max-w-md">
          <h2
            data-svc="title"
            className="font-display text-5xl font-semibold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Dental
            <br />
            Implants
          </h2>
          <p data-svc="sub" className="mt-5 text-base leading-relaxed text-white/70">
            Digitally Guided Implant
            <br />
            All-on-4 Full Mouth Implant
          </p>
          <ul className="mt-8 space-y-4">
            {FEATURES.map((feature) => (
              <li key={feature} data-svc-item className="flex items-center gap-3 text-white/90">
                <span className="h-2.5 w-2.5 rotate-45 rounded-[2px] bg-primary shadow-[0_0_12px_rgba(245,166,35,0.6)]" />
                <span className="text-base font-medium">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
